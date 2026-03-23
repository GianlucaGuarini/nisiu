import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "rgb(93, 142, 146)",
      contrastText: "#fff",
    },
    secondary: {
      main: "#3f51b5",
    },
    background: {
      default: "#fffff2",
      paper: "#ffffff",
    },
    error: {
      main: "#f44336",
    },
    text: {
      primary: "#1a1a2e",
      secondary: "#6b7280",
    },
    divider: "rgba(0, 0, 0, 0.06)",
  },
  typography: {
    fontFamily: '"Inter", "Roboto", Arial, sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "8px 20px",
          transition: "all 0.2s ease",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(93, 142, 146, 0.3)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            transition: "all 0.2s ease",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(93, 142, 146)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(93, 142, 146, 0.08)",
          },
        },
      },
    },
  },
});
