import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import { PasswordsCollection } from "./PasswordsCollection";
import { PasswordForm } from "./PasswordForm";
import { PasswordRevealer } from "./PasswordRevealer";
import { useStore } from "../store/StoreContext";
import { type PasswordData } from "../database";

export function PasswordsManager() {
  const { passwords, addPassword, editPassword, deletePassword } = useStore();
  const totalPasswords = passwords.length;
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState<PasswordData | null>(
    null,
  );
  const [revealingPassword, setRevealingPassword] =
    useState<PasswordData | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPasswords = passwords.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSave = async (
    password: Omit<PasswordData, "id"> | PasswordData,
  ) => {
    if ("id" in password) {
      await editPassword(password);
    } else {
      await addPassword(password);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      await deletePassword(id);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flex: 1,
        maxWidth: 800,
        mx: "auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          p: 3,
          bgcolor: "background.default",
          transition: "box-shadow 0.2s ease",
          boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "none",
        }}
      >
        <TextField
          placeholder="Search passwords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 240 }}
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <Box
                  component="span"
                  sx={{ color: "text.secondary", mr: 1, fontSize: 18 }}
                >
                  ⌘
                </Box>
              ),
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setFormOpen(true)}
        >
          Add Password
        </Button>
      </Box>
      <Box sx={{ px: 3, pb: 3 }}>
        <PasswordsCollection
          passwords={filteredPasswords}
          totalPasswords={totalPasswords}
          onReveal={setRevealingPassword}
          onEdit={(password) => {
            setEditingPassword(password);
          }}
          onDelete={handleDelete}
        />
      </Box>

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
  );
}
