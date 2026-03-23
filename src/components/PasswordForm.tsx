import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material'
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

  const isEditing = !!password

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
  }, [password])

  const handleGenerate = () => {
    setValue(generatePassword(16))
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
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <Button onClick={handleGenerate} size="small">
                  Generate
                </Button>
              ),
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
