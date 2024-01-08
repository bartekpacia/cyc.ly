import { green, purple } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
  palette: {
    action: {
      active: 'rgba(255, 255, 255, 0.54)',
      hover: 'rgba(255, 255, 255, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(255, 255, 255, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(255, 255, 255, 0.26)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(255, 255, 255, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,

    divider: 'rgba(255, 255, 255, 0.50)',
    background: {
      paper: '#1c1c1c',
      default: '#000000',
    },
    primary: {
      main: green[500],
      contrastText: '#fff',
      light: green[300],
      dark: green[700],
    },
    secondary: {
      main: '#fff',
      contrastText: 'black',
      light: green[300],
      dark: green[700],
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
      disabled: '#fff',
    },
  },

  shape: {
    borderRadius: 12,
  },
  typography: {
    fontSize: 13,
    htmlFontSize: 13,
    fontFamily: 'Montserrat, sans-serif',
    body1: {
      fontSize: '14px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

        body{
          font-family: 'Montserrat', sans-serif;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-background-clip: text;
            -webkit-text-fill-color: #ffffff;
            transition: background-color 5000s ease-in-out 0s;
            box-shadow: inset 0 0 20px 20px #23232329;
        }
        `,
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#fff',
          textDecoration: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: 'none',
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        disableAnimation: true,
        shrink: true,
      },
      styleOverrides: {
        root: {
          color: 'white',
          position: 'relative',
          transform: 'none',
          marginBottom: 6,
          '&.Mui-focused': {
            color: '#fff !important',
          },
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          '& legend': {
            span: { display: 'none' },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.87)',
            },
          },
        }),
        disabled: {
          color: 'gray',
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: 'transparent',
          border: 'none',
          borderBottom: '1px solid',
          borderColor: theme.palette.divider,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: '1px solid',
          borderColor: theme.palette.divider,
        }),
      },
    },
  },
});
