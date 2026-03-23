import { Box, Typography } from '@mui/material'
import { MasterPasswordCheck } from './MasterPasswordCheck'
import { Login } from './Login'
import { useStore } from '../store/StoreContext'

export function Lock() {
  const { user, encryptedKey } = useStore()

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      <Box component="img" src="/assets/images/nisiu.png" sx={{ width: 240, maxWidth: '60%' }} />
      
      {!user ? (
        <>
          <Typography variant="h4">Welcome to nisiu</Typography>
          <Typography color="text.secondary">
            Please log in with your Google account
          </Typography>
          <Login />
        </>
      ) : (
        <MasterPasswordCheck isFirstSet={!encryptedKey} />
      )}
    </Box>
  )
}
