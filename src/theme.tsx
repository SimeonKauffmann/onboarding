import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import openSans from "./fonts/Open-Sans.ttf"
import mulish from "./fonts/Mulish.ttf"

declare module "@mui/material/styles" {
  interface TypographyVariants {
    step: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    step?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    step: true
  }
}

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 750,
      md: 1300,
      lg: 2000,
      xl: 2900,
    },
  },
  palette: {
    primary: {
      main: "#007096",
    },
    secondary: {
      main: "#f5a625",
      light: "#f3e5f5",
    },
    text: {
      primary: "#007096",
      secondary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Mulish",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Open Sans'; 
        font-display: swap;
        font-weight: 400;
        src: url(${openSans}) format('truetype'); 
        unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2160-2188, U+2191, U+2193, U+2212, U+2215, U+FEFF'
      }
      
      @font-face{
        font-family: 'Mulish'; 
        font-display: swap;
        font-weight: 400;
        src: url(${mulish}) format('truetype'); 
        unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2160-2188, U+2191, U+2193, U+2212, U+2215, U+FEFF'
      }`,
    },
  },
})

theme = responsiveFontSizes(theme)
theme.typography.step = {
  fontSize: "165px",
  fontFamily: "Open Sans",
  opacity: "80%",
  [theme.breakpoints.down("lg")]: {
    fontSize: "100px",
  },
}

theme.typography.h4 = {
  ...theme.typography.h4,
  fontWeight: 600,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.8219rem;",
  },
}

export default theme
