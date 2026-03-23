import { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { PasswordsCollection } from './PasswordsCollection'
import { PasswordForm } from './PasswordForm'
import { PasswordRevealer } from './PasswordRevealer'
import { useStore } from '../store/StoreContext'
import { type PasswordData } from '../database'

export function PasswordsManager() {
  const { passwords, addPassword, editPassword, deletePassword } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingPassword, setEditingPassword] = useState<PasswordData | null>(null)
  const [revealingPassword, setRevealingPassword] = useState<PasswordData | null>(null)

  const filteredPasswords = passwords.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSave = async (password: Omit<PasswordData, 'id'> | PasswordData) => {
    if ('id' in password) {
      await editPassword(password)
    } else {
      await addPassword(password)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      await deletePassword(id)
    }
  }

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <TextField
          placeholder="Search passwords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 280 }}
          size="small"
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setFormOpen(true)}
        >
          Add Password
        </Button>
      </Box>

      <PasswordsCollection
        passwords={filteredPasswords}
        onReveal={setRevealingPassword}
        onEdit={(password) => {
          setEditingPassword(password)
        }}
        onDelete={handleDelete}
      />

      <PasswordForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />

      <PasswordForm
        open={!!editingPassword}
        password={editingPassword}
        onClose={() => setEditingPassword(null)}
        onSave={handleSave}
      />

      <PasswordRevealer
        open={!!revealingPassword}
        password={revealingPassword}
        onClose={() => setRevealingPassword(null)}
      />
    </Box>
  )
}
