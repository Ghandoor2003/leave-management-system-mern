import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f4f8', // Light blue background
    },
    primary: {
      main: '#1976d2', // Blue color for primary elements
    },
    secondary: {
      main: '#757575', // Gray color for secondary elements
    },
  },
});

export default theme;