import { Box } from "@mui/material";
import { StoreProvider, useStore } from "./store/StoreContext";
import { Loader } from "./components/Loader";
import { Lock } from "./components/Lock";
import { MainHeader } from "./components/MainHeader";
import { PasswordsManager } from "./components/PasswordsManager";
import { MainFooter } from "./components/MainFooter";

function AppContent() {
  const { isLoading, isLocked } = useStore();

  if (isLoading) {
    return <Loader />;
  }

  if (isLocked) {
    return <Lock />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <MainHeader />
      <Box
        component="main"
        sx={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <PasswordsManager />
      </Box>
      <MainFooter />
    </Box>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
