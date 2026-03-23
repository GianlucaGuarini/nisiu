import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { type PasswordData } from '../database'

interface PasswordRevealerProps {
  open: boolean
  password: PasswordData | null
  onClose: () => void
}

export function PasswordRevealer({ open, password, onClose }: PasswordRevealerProps) {
  const [showPassword, setShowPassword] = useState(false)

  if (!password) return null

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{password.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {password.username && (
            <Box>
              <Typography variant="caption" color="text.secondary">Username</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography>{password.username}</Typography>
                <IconButton size="small" onClick={() => handleCopy(password.username)}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )}
          
          <Box>
            <Typography variant="caption" color="text.secondary">Password</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontFamily: 'monospace' }}>
                {showPassword ? password.value : '••••••••••••'}
              </Typography>
              <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
              <IconButton size="small" onClick={() => handleCopy(password.value)}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {password.comment && (
            <Box>
              <Typography variant="caption" color="text.secondary">Comment</Typography>
              <Typography>{password.comment}</Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
