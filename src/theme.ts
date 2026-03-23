import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(93, 142, 146)",
    },
    secondary: {
      main: "#3f51b5",
    },
    background: {
      default: "#fffff2",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});
