import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  type User,
} from 'firebase/auth'
import { firebaseApp, database, type PasswordData } from '../database'
import { decrypt } from '../crypto'
import { generatePassword } from '../password-generator'
import { generateId } from '../random-id'

const USER_KEY_LENGTH = 64

interface EncryptedPassword {
  id: string
  name: string
  username: string
  value: string
  comment: string
}

interface Store {
  user: User | null
  encryptedKey: string | false
  key: string | false
  isLocked: boolean
  isLoading: boolean
  passwords: PasswordData[]
}

interface StoreContextType extends Store {
  login: () => Promise<void>
  logout: () => Promise<void>
  unlock: (password: string) => Promise<boolean>
  setEncryptedKey: (password: string) => Promise<void>
  fetchPasswords: () => Promise<void>
  addPassword: (password: Omit<PasswordData, 'id'>) => Promise<void>
  editPassword: (password: PasswordData) => Promise<void>
  deletePassword: (id: string) => Promise<void>
}

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Store>({
    user: null,
    encryptedKey: false,
    key: false,
    isLocked: true,
    isLoading: true,
    passwords: [],
  })

  useEffect(() => {
    const auth = getAuth(firebaseApp)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setState(prev => ({ ...prev, user }))
      if (user) {
        const encryptedKey = await database.key.get(user.uid)
        setState(prev => ({ ...prev, encryptedKey: encryptedKey || false }))
      }
      setState(prev => ({ ...prev, isLoading: false }))
    })
    return unsubscribe
  }, [])

  const login = useCallback(async () => {
    const auth = getAuth(firebaseApp)
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }, [])

  const logout = useCallback(async () => {
    const auth = getAuth(firebaseApp)
    await signOut(auth)
    setState(prev => ({ ...prev, key: false, isLocked: true, passwords: [] }))
  }, [])

  const unlock = useCallback(async (password: string): Promise<boolean> => {
    if (!state.user || !state.encryptedKey) return false
    const key = decrypt(state.encryptedKey, password)
    if (key) {
      setState(prev => ({ ...prev, key, isLocked: false }))
      return true
    }
    return false
  }, [state.user, state.encryptedKey])

  const setEncryptedKey = useCallback(async (password: string) => {
    if (!state.user) return
    const key = state.key || generatePassword(USER_KEY_LENGTH)
    await database.key.set(state.user.uid, key, password)
    setState(prev => ({ ...prev, key, encryptedKey: key, isLocked: false }))
  }, [state.user, state.key])

  const fetchPasswords = useCallback(async () => {
    if (!state.user || !state.key) return
    const encryptedPasswords = await database.account.getPasswords(state.user.uid)
    const passwords = Object.values(encryptedPasswords as Record<string, EncryptedPassword>).map((p) => ({
      id: p.id,
      name: decrypt(p.name, state.key as string),
      username: decrypt(p.username, state.key as string),
      value: decrypt(p.value, state.key as string),
      comment: decrypt(p.comment, state.key as string),
    }))
    setState(prev => ({ ...prev, passwords }))
  }, [state.user, state.key])

  const addPassword = useCallback(async (password: Omit<PasswordData, 'id'>) => {
    if (!state.user || !state.key) return
    const id = generateId()
    await database.password.set(state.user.uid, id, state.key, { ...password, id })
    await fetchPasswords()
  }, [state.user, state.key, fetchPasswords])

  const editPassword = useCallback(async (password: PasswordData) => {
    if (!state.user || !state.key) return
    await database.password.set(state.user.uid, password.id, state.key, password)
    await fetchPasswords()
  }, [state.user, state.key, fetchPasswords])

  const deletePassword = useCallback(async (id: string) => {
    if (!state.user) return
    await database.password.delete(state.user.uid, id)
    await fetchPasswords()
  }, [state.user, fetchPasswords])

  useEffect(() => {
    if (!state.isLocked) {
      fetchPasswords()
    }
  }, [state.isLocked, fetchPasswords])

  return (
    <StoreContext.Provider
      value={{
        ...state,
        login,
        logout,
        unlock,
        setEncryptedKey,
        fetchPasswords,
        addPassword,
        editPassword,
        deletePassword,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return context
}
