import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fc6e64',
    },
    secondary: {
      main: '#3f51b5',
    },
    background: {
      default: '#fffff2',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
})
