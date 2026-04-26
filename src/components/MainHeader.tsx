import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import { useStore } from "../store/StoreContext";

export function MainHeader() {
  const { user, logout } = useStore();

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        py: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {user && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            src={user.photoURL || undefined}
            alt={user.displayName || ""}
            sx={{ width: 36, height: 36 }}
          />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {user.displayName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      )}

      <Box>
        {user ? (
          <Tooltip title="Lock">
            <Button
              variant="text"
              size="small"
              onClick={logout}
              startIcon={<LogoutIcon />}
              sx={{ color: "text.secondary" }}
            >
              Logout
            </Button>
          </Tooltip>
        ) : null}
      </Box>
    </Box>
  );
}
