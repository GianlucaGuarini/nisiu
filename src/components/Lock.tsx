import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { MasterPasswordCheck } from "./MasterPasswordCheck";
import { Login } from "./Login";
import { useStore } from "../store/StoreContext";

export function Lock() {
  const { user } = useStore();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Box
        component="img"
        src="./images/nisiu.png"
        sx={{ width: 200, maxWidth: "50%", mb: 4 }}
      />

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 380,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {!user ? (
          <>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Welcome to nisiu
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{ mb: 3 }}>
              Your secure password manager
            </Typography>
            <Login />
          </>
        ) : (
          <>
            <MasterPasswordCheck />
          </>
        )}
      </Paper>
    </Box>
  );
}
