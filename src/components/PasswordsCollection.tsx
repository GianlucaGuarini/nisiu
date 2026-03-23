import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { type PasswordData } from "../database";

interface PasswordsCollectionProps {
  passwords: PasswordData[];
  totalPasswords: number;
  onReveal: (password: PasswordData) => void;
  onEdit: (password: PasswordData) => void;
  onDelete: (id: string) => void;
}

export function PasswordsCollection({
  passwords,
  totalPasswords,
  onReveal,
  onEdit,
  onDelete,
}: PasswordsCollectionProps) {
  const isSearching = passwords.length === 0 && totalPasswords > 0;

  if (passwords.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          px: 3,
          border: "2px dashed",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Box sx={{ fontSize: 48, mb: 2, opacity: 0.3 }}>
          {isSearching ? "🔍" : "🔐"}
        </Box>
        <Typography color="text.secondary" variant="body1">
          {isSearching ? "No passwords found" : "No passwords saved yet"}
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mt: 1 }}>
          {isSearching
            ? "Try a different search term"
            : 'Click "Add Password" to get started'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      }}
    >
      {passwords.map((password) => (
        <Box
          key={password.id}
          onClick={() => onReveal(password)}
          sx={{
            p: 2.5,
            bgcolor: "background.paper",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "primary.main",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(93, 142, 146, 0.15)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: password.username ? 1.5 : 0,
            }}
          >
            <Typography fontWeight={600} variant="body1">
              {password.name}
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(password);
                }}
                sx={{ ml: "auto" }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(password.id);
                }}
              >
                <DeleteIcon fontSize="small" sx={{ color: "error.main" }} />
              </IconButton>
            </Box>
          </Box>
          {password.username && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PersonIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary" noWrap>
                {password.username}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
