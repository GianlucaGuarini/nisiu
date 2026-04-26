<img width="100%" src="images/nisiu.png" alt="nisiu logo" />

nisiu is a free, secure password manager that stores your data in your own Firebase instance.

## Features

- **Private** - Your passwords are encrypted locally using AES-256 before being stored
- **Secure** - Uses Google OAuth for authentication
- **Biometric** - Supports Touch ID / Fingerprint for quick unlocking
- **Password Generator** - Built-in secure password generator
- **Search** - Quickly find your saved passwords

## Setup

### 1. Firebase Configuration

Create a Firebase project at [firebase.google.com](https://console.firebase.google.com/) and enable Google Authentication in the Firebase Console under Authentication > Sign-in method.

Replace the Firebase credentials in your `.env` file:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. Install & Build

```bash
npm install
npm run build
```

### 3. Deploy

Deploy to any static hosting service (Firebase Hosting, Vercel, Netlify, etc.) or open `docs/index.html` locally.

## Database Rules

For private use, add these rules in Firebase Console > Realtime Database:

```json
{
  "rules": {
    "$uid": {
      ".read": "$uid === auth.uid",
      ".write": "$uid === auth.uid"
    }
  }
}
```

## Technology Stack

- React 19
- TypeScript
- MUI (Material UI)
- Firebase (Auth + Realtime Database)
- CryptoJS (AES encryption)
- WebAuthn (Biometric authentication)

## License

MIT

