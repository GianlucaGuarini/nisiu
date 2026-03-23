import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  FormControlLabel,
  Checkbox,
  Divider,
  CircularProgress,
} from "@mui/material";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { useStore } from "../store/StoreContext";
import { isTrustedDevice } from "../webauthn";

export function MasterPasswordCheck() {
  const {
    unlock,
    unlockWithBiometric,
    setEncryptedKey,
    encryptedKey,
    biometricAvailable,
  } = useStore();

  const canUseBiometric = biometricAvailable && isTrustedDevice();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enableBiometric, setEnableBiometric] = useState(biometricAvailable);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [biometricLoading, setBiometricLoading] = useState(false);

  const isFirstSet = !encryptedKey;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isFirstSet) {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }
        if (password.length < 4) {
          setError("Password must be at least 4 characters");
          setIsLoading(false);
          return;
        }
        await setEncryptedKey(password, enableBiometric && biometricAvailable);
      } else {
        const success = await unlock(password);
        if (!success) {
          setError("Invalid password");
        }
      }
    } catch {
      setError("An error occurred");
    }
    setIsLoading(false);
  };

  const handleBiometricUnlock = async () => {
    setBiometricLoading(true);
    setError("");

    try {
      const success = await unlockWithBiometric();
      if (!success) {
        setError(
          "Biometric authentication failed. Please use your master password.",
        );
      }
    } catch {
      setError(
        "Biometric authentication failed. Please use your master password.",
      );
    }
    setBiometricLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 300 }}>
      <Typography variant="body1" gutterBottom>
        {isFirstSet ? "Create Master Password" : "Enter Master Password"}
      </Typography>

      <TextField
        sx={{ mt: 0 }}
        fullWidth
        label="Password"
        type="password"
        size="small"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="dense"
        required
        disabled={isLoading}
      />

      {isFirstSet && (
        <>
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

          {biometricAvailable && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={enableBiometric}
                  onChange={(e) => setEnableBiometric(e.target.checked)}
                  disabled={isLoading}
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FingerprintIcon fontSize="small" />
                  <Typography variant="body2">
                    Enable biometric unlock
                  </Typography>
                </Box>
              }
              sx={{ mt: 1 }}
            />
          )}
        </>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading || biometricLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? (
          <CircularProgress size={24} />
        ) : isFirstSet ? (
          "Create"
        ) : (
          "Unlock"
        )}
      </Button>

      {!isFirstSet && canUseBiometric && (
        <>
          <Divider sx={{ my: 2 }}>or</Divider>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={
              biometricLoading ? (
                <CircularProgress size={20} />
              ) : (
                <FingerprintIcon />
              )
            }
            onClick={handleBiometricUnlock}
            disabled={isLoading || biometricLoading}
          >
            {biometricLoading ? "Authenticating..." : "Use Biometrics"}
          </Button>
        </>
      )}
    </Box>
  );
}
