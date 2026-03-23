import { useState } from 'react'
import { Box, Typography, Link, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import { useStore } from '../store/StoreContext'

export function MainFooter() {
  const { biometricAvailable, isTrustedDevice, disableBiometric, enableBiometric } = useStore()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [enabling, setEnabling] = useState(false)

  const year = new Date().getFullYear()

  const handleDisableBiometric = () => {
    if (window.confirm('Are you sure you want to disable biometric authentication?')) {
      disableBiometric()
      setSettingsOpen(false)
    }
  }

  const handleEnableBiometric = async () => {
    setEnabling(true)
    const success = await enableBiometric()
    setEnabling(false)
    if (success) {
      setSettingsOpen(false)
    } else {
      alert('Failed to enable biometric authentication')
    }
  }

  return (
    <>
      <Box
        component="footer"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          p: 2,
          mt: 'auto',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Gianluca Guarini &copy; {year}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {biometricAvailable && (
            <Button
              size="small"
              startIcon={<SettingsIcon />}
              onClick={() => setSettingsOpen(true)}
            >
              Settings
            </Button>
          )}
          <Link
            href="https://github.com/GianlucaGuarini/nisiu"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            View on GitHub
          </Link>
        </Box>
      </Box>

      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Biometric Authentication
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {isTrustedDevice 
              ? 'You can use Touch ID / Fingerprint to unlock your passwords on this device.'
              : 'Enable biometric authentication to unlock your passwords with your fingerprint.'}
          </Typography>
          
          {!isTrustedDevice && (
            <Button
              variant="contained"
              color="primary"
              startIcon={enabling ? <CircularProgress size={20} color="inherit" /> : <FingerprintIcon />}
              onClick={handleEnableBiometric}
              disabled={enabling}
              sx={{ mb: 2 }}
            >
              {enabling ? 'Enabling...' : 'Enable Biometric Authentication'}
            </Button>
          )}

          {isTrustedDevice && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDisableBiometric}
            >
              Disable Biometric Authentication
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
