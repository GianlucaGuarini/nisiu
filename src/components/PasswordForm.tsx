import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import { type PasswordData } from '../database'
import { generatePassword } from '../password-generator'

interface PasswordFormProps {
  open: boolean
  password?: PasswordData | null
  onClose: () => void
  onSave: (password: Omit<PasswordData, 'id'> | PasswordData) => void
}

export function PasswordForm({ open, password, onClose, onSave }: PasswordFormProps) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [value, setValue] = useState('')
  const [comment, setComment] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const isEditing = !!password

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (password) {
      setName(password.name)
      setUsername(password.username)
      setValue(password.value)
      setComment(password.comment)
    } else {
      setName('')
      setUsername('')
      setValue('')
      setComment('')
    }
    setShowPassword(false)
  }, [password])

  const handleGenerate = () => {
    setValue(generatePassword(16))
    setShowPassword(true)
  }

  const handleSubmit = () => {
    if (isEditing && password) {
      onSave({ ...password, name, username, value, comment })
    } else {
      onSave({ name, username, value, comment })
    }
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? 'Edit Password' : 'Add Password'}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleGenerate} edge="end" title="Generate password">
                      <AutorenewIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!name || !value}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
