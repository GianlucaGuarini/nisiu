import { Button } from '@mui/material'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { firebaseApp } from '../database'

export function Login() {
  const handleLogin = async () => {
    const auth = getAuth(firebaseApp)
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleLogin}
      sx={{ mt: 2 }}
    >
      Login with Google
    </Button>
  )
}
