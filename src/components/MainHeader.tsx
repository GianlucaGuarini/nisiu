import { Box, Avatar, Typography, Button } from '@mui/material'
import { useStore } from '../store/StoreContext'
import { Login } from './Login'

export function MainHeader() {
  const { user, logout } = useStore()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      {user && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar src={user.photoURL || undefined} alt={user.displayName || ''} />
          <Typography>{user.displayName}</Typography>
        </Box>
      )}
      
      <Box>
        {user ? (
          <Button variant="text" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Login />
        )}
      </Box>
    </Box>
  )
}
