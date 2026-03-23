import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import SettingsIcon from "@mui/icons-material/Settings";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { useStore } from "../store/StoreContext";

export function MainFooter() {
  const {
    biometricAvailable,
    isTrustedDevice,
    disableBiometric,
    enableBiometric,
  } = useStore();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [enabling, setEnabling] = useState(false);

  const year = new Date().getFullYear();

  const handleDisableBiometric = () => {
    if (
      window.confirm(
        "Are you sure you want to disable biometric authentication?",
      )
    ) {
      disableBiometric();
      setSettingsOpen(false);
    }
  };

  const handleEnableBiometric = async () => {
    setEnabling(true);
    const success = await enableBiometric();
    setEnabling(false);
    if (success) {
      setSettingsOpen(false);
    } else {
      alert("Failed to enable biometric authentication");
    }
  };

  return (
    <>
      <Box
        component="footer"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          mt: "auto",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
          &copy; {year} nisiu
        </Typography>
        {biometricAvailable && (
          <IconButton
            size="small"
            onClick={() => setSettingsOpen(true)}
            sx={{ color: "text.secondary" }}
          >
            <SettingsIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Dialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        PaperProps={{ sx: { maxWidth: 400 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>Biometric Settings</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: "rgba(93, 142, 146, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FingerprintIcon sx={{ color: "primary.main", fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="body1" fontWeight={500}>
                {isTrustedDevice ? "Enabled" : "Not Enabled"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isTrustedDevice
                  ? "Use Touch ID / Fingerprint to unlock"
                  : "Unlock with your fingerprint"}
              </Typography>
            </Box>
          </Box>

          {!isTrustedDevice && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={
                enabling ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <FingerprintIcon />
                )
              }
              onClick={handleEnableBiometric}
              disabled={enabling}
            >
              {enabling ? "Enabling..." : "Enable Biometric"}
            </Button>
          )}

          {isTrustedDevice && (
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={handleDisableBiometric}
            >
              Disable
            </Button>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setSettingsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
