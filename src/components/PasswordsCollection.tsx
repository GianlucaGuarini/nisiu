import { Box, Paper, List, ListItemButton, ListItemText, IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { type PasswordData } from '../database'

interface PasswordsCollectionProps {
  passwords: PasswordData[]
  onReveal: (password: PasswordData) => void
  onEdit: (password: PasswordData) => void
  onDelete: (id: string) => void
}

export function PasswordsCollection({
  passwords,
  onReveal,
  onEdit,
  onDelete,
}: PasswordsCollectionProps) {
  if (passwords.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">No passwords saved yet</Typography>
      </Box>
    )
  }

  return (
    <Paper elevation={2} sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
      <List>
        {passwords.map((password) => (
          <ListItemButton
            key={password.id}
            onClick={() => onReveal(password)}
            sx={{ py: 2 }}
          >
            <ListItemText
              primary={password.name}
              secondary={password.username}
            />
            <IconButton onClick={(e) => { e.stopPropagation(); onEdit(password) }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={(e) => { e.stopPropagation(); onDelete(password.id) }}>
              <DeleteIcon color="error" />
            </IconButton>
          </ListItemButton>
        ))}
      </List>
    </Paper>
  )
}
