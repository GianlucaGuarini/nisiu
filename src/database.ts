import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, remove, update } from "firebase/database";
import { encrypt } from "./crypto";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getDatabase(firebaseApp);

function userPasswords(userId: string) {
  return `${userId}/passwords`;
}

function userPassword(userId: string, passwordId: string) {
  return `${userPasswords(userId)}/${passwordId}`;
}

function userKey(userId: string) {
  return `${userId}/key`;
}

export interface PasswordData {
  id: string;
  name: string;
  username: string;
  value: string;
  comment: string;
}

export const database = {
  account: {
    async delete(user: { uid: string; delete: () => Promise<void> }) {
      await Promise.all([
        user.delete(),
        remove(ref(db, userKey(user.uid))),
        remove(ref(db, userPasswords(user.uid))),
      ]);
    },
    async getPasswords(userId: string) {
      const snapshot = await get(ref(db, userPasswords(userId)));
      return snapshot.val() || {};
    },
  },
  key: {
    async get(userId: string) {
      const snapshot = await get(ref(db, userKey(userId)));
      return snapshot.val();
    },
    async set(userId: string, key: string, password: string) {
      await update(ref(db), {
        [userKey(userId)]: encrypt(key, password),
      });
    },
  },
  password: {
    async delete(userId: string, id: string) {
      await remove(ref(db, userPassword(userId, id)));
    },
    async set(userId: string, id: string, key: string, password: PasswordData) {
      const { username, name, value, comment } = password;
      await update(ref(db), {
        [userPassword(userId, id)]: {
          id,
          name: encrypt(name, key),
          username: encrypt(username, key),
          value: encrypt(value, key),
          comment: encrypt(comment, key),
        },
      });
    },
  },
};
