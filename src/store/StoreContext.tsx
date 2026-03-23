import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  type User,
} from "firebase/auth";
import { firebaseApp, database, type PasswordData } from "../database";
import { decrypt } from "../crypto";
import { generatePassword } from "../password-generator";
import { generateId } from "../random-id";
import {
  isBiometricAvailable,
  registerBiometric,
  authenticateWithBiometric,
  isTrustedDevice,
  removeTrustedDevice,
} from "../webauthn";

const USER_KEY_LENGTH = 64;

interface EncryptedPassword {
  id: string;
  name: string;
  username: string;
  value: string;
  comment: string;
}

interface Store {
  user: User | null;
  encryptedKey: string | false;
  key: string | false;
  masterPassword: string | null;
  isLocked: boolean;
  isLoading: boolean;
  passwords: PasswordData[];
  biometricAvailable: boolean;
  isTrustedDevice: boolean;
}

interface StoreContextType extends Store {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  unlock: (password: string) => Promise<boolean>;
  unlockWithBiometric: () => Promise<boolean>;
  setEncryptedKey: (
    password: string,
    enableBiometric?: boolean,
  ) => Promise<void>;
  enableBiometric: () => Promise<boolean>;
  fetchPasswords: () => Promise<void>;
  addPassword: (password: Omit<PasswordData, "id">) => Promise<void>;
  editPassword: (password: PasswordData) => Promise<void>;
  deletePassword: (id: string) => Promise<void>;
  disableBiometric: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Store>({
    user: null,
    encryptedKey: false,
    key: false,
    masterPassword: null,
    isLocked: true,
    isLoading: true,
    passwords: [],
    biometricAvailable: false,
    isTrustedDevice: false,
  });

  useEffect(() => {
    const checkBiometric = async () => {
      const available = await isBiometricAvailable();
      const trusted = isTrustedDevice();
      setState((prev) => ({
        ...prev,
        biometricAvailable: available,
        isTrustedDevice: trusted,
      }));
    };
    checkBiometric();
  }, []);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setState((prev) => ({ ...prev, user }));
      if (user) {
        const encryptedKey = await database.key.get(user.uid);
        setState((prev) => ({ ...prev, encryptedKey: encryptedKey || false }));
      }
      setState((prev) => ({ ...prev, isLoading: false }));
    });
    return unsubscribe;
  }, []);

  const login = useCallback(async () => {
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }, []);

  const logout = useCallback(async () => {
    const auth = getAuth(firebaseApp);
    await signOut(auth);
    setState((prev) => ({
      ...prev,
      key: false,
      masterPassword: null,
      isLocked: true,
      passwords: [],
    }));
  }, []);

  const unlock = useCallback(
    async (password: string): Promise<boolean> => {
      if (!state.user || !state.encryptedKey) return false;
      const key = decrypt(state.encryptedKey, password);
      if (key) {
        setState((prev) => ({
          ...prev,
          key,
          masterPassword: password,
          isLocked: false,
        }));
        return true;
      }
      return false;
    },
    [state.user, state.encryptedKey],
  );

  const unlockWithBiometric = useCallback(async (): Promise<boolean> => {
    if (!state.user || !state.encryptedKey) return false;

    const masterPassword = await authenticateWithBiometric();
    if (!masterPassword) return false;

    const key = decrypt(state.encryptedKey, masterPassword);
    if (key) {
      setState((prev) => ({ ...prev, key, isLocked: false }));
      return true;
    }
    return false;
  }, [state.user, state.encryptedKey]);

  const setEncryptedKey = useCallback(
    async (password: string, enableBiometricFlag = false) => {
      if (!state.user) return;
      const key = state.key || generatePassword(USER_KEY_LENGTH);
      await database.key.set(state.user.uid, key, password);

      if (enableBiometricFlag) {
        const success = await registerBiometric(state.user.uid, password);
        if (success) {
          setState((prev) => ({ ...prev, isTrustedDevice: true }));
        }
      }

      setState((prev) => ({
        ...prev,
        key,
        encryptedKey: key,
        masterPassword: password,
        isLocked: false,
      }));
    },
    [state.user, state.key],
  );

  const enableBiometric = useCallback(async (): Promise<boolean> => {
    if (!state.user || !state.key || !state.masterPassword) return false;
    const success = await registerBiometric(
      state.user.uid,
      state.masterPassword,
    );
    if (success) {
      setState((prev) => ({ ...prev, isTrustedDevice: true }));
    }
    return success;
  }, [state.user, state.key, state.masterPassword]);

  const fetchPasswords = useCallback(async () => {
    if (!state.user || !state.key) return;
    const encryptedPasswords = await database.account.getPasswords(
      state.user.uid,
    );
    const passwords = Object.values(
      encryptedPasswords as Record<string, EncryptedPassword>,
    ).map((p) => ({
      id: p.id,
      name: decrypt(p.name, state.key as string),
      username: decrypt(p.username, state.key as string),
      value: decrypt(p.value, state.key as string),
      comment: decrypt(p.comment, state.key as string),
    }));
    setState((prev) => ({ ...prev, passwords }));
  }, [state.user, state.key]);

  const addPassword = useCallback(
    async (password: Omit<PasswordData, "id">) => {
      if (!state.user || !state.key) return;
      const id = generateId();
      await database.password.set(state.user.uid, id, state.key, {
        ...password,
        id,
      });
      await fetchPasswords();
    },
    [state.user, state.key, fetchPasswords],
  );

  const editPassword = useCallback(
    async (password: PasswordData) => {
      if (!state.user || !state.key) return;
      await database.password.set(
        state.user.uid,
        password.id,
        state.key,
        password,
      );
      await fetchPasswords();
    },
    [state.user, state.key, fetchPasswords],
  );

  const deletePassword = useCallback(
    async (id: string) => {
      if (!state.user) return;
      await database.password.delete(state.user.uid, id);
      await fetchPasswords();
    },
    [state.user, fetchPasswords],
  );

  const disableBiometric = useCallback(() => {
    removeTrustedDevice();
    setState((prev) => ({ ...prev, isTrustedDevice: false }));
  }, []);

  useEffect(() => {
    if (!state.isLocked) {
      fetchPasswords();
    }
  }, [state.isLocked, fetchPasswords]);

  return (
    <StoreContext.Provider
      value={{
        ...state,
        login,
        logout,
        unlock,
        unlockWithBiometric,
        setEncryptedKey,
        enableBiometric,
        fetchPasswords,
        addPassword,
        editPassword,
        deletePassword,
        disableBiometric,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}
