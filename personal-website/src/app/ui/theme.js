'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },

 palette: {
    primary: {
      main: '#ffd288', // Main primary color
      light: '#ffe4b8', // Light primary color
      dark: '#ffc057', // Dark primary color
    },
    secondary: {
      main: '#8eb8fa', // Main secondary color
      light: '#b8d3ff', // Light secondary color
      dark: '#6b9cf0', // Dark secondary color
    },
    text: {
      primary: '#3d3d3c', // Primary text color
      secondary: '#b6b7b8', // Secondary text color
    },
    background: {
      default: '#fff4e2', // Default background color
      paper: '#e7f2ff', // Paper background color
    },
    error: {
      main: '#f44336', // Error color
    },
  },

  // Customize breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },

});

export default theme;