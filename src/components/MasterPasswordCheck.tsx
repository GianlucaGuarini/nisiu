import { useState } from 'react'
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from '@mui/material'
import { useStore } from '../store/StoreContext'

interface MasterPasswordCheckProps {
  isFirstSet?: boolean
}

export function MasterPasswordCheck({ isFirstSet = false }: MasterPasswordCheckProps) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { unlock, setEncryptedKey, encryptedKey } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isFirstSet || !encryptedKey) {
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setIsLoading(false)
          return
        }
        if (password.length < 4) {
          setError('Password must be at least 4 characters')
          setIsLoading(false)
          return
        }
        await setEncryptedKey(password)
      } else {
        const success = await unlock(password)
        if (!success) {
          setError('Invalid password')
        }
      }
    } catch {
      setError('An error occurred')
    }
    setIsLoading(false)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 300 }}>
      <Typography variant="h6" gutterBottom>
        {isFirstSet ? 'Create Master Password' : 'Enter Master Password'}
      </Typography>
      
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
        disabled={isLoading}
      />

      {(isFirstSet || !encryptedKey) && (
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          required
          disabled={isLoading}
        />
      )}

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isFirstSet || !encryptedKey ? 'Create' : 'Unlock'}
      </Button>
    </Box>
  )
}
