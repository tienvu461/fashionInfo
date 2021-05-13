/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import { useState } from 'react';

export const white = '#fff';
export const black = '#000000';
export const grayPrimary = '#C4C4C4';
export const gray = '#EEEEEE';
export const textMenu = '#373F41';

// padding (view + responsive)
export const pdXL = '0 200px';
export const pdLG = '0 100px';
export const pdMD = '0 50px';
export const pdSM = '0 20px';

export const pdLeft = '200px'; // view
export const pdLeftResponsive = '20px'; // view

export const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: '300',
  lineHeight: '1.5em',
};

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: white,
      main: white,
      dark: black,
      contrastText: black,
    },
    secondary: {
      contrastText: white,
      main: '#000',
      light: white,
      dark: black,
    },
    common: {
      black: white,
      white,
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    h6: {
      fontSize: '18px',
      '@media (max-width:1302px)': {
        fontSize: '20px',
      },
      '@media (max-width:960px)': {
        fontSize: '18px',
      },
    },
    h5: {
      fontSize: '1.2rem',
      '@media (min-width:1302px)': {
        fontSize: '2rem',
      },
    },
    h4: {
      fontSize: '1.4rem',
      '@media (min-width:1302px)': {
        fontSize: '2.2rem',
      },
    },
    h1: {
      fontSize: '6rem',
      '@media (max-width:1302px)': {
        fontSize: '3.4rem',
      },
      '@media (max-width:960px)': {
        fontSize: '2.8rem',
      },
      '@media (max-width:720px)': {
        fontSize: '2.4rem',
      },
      '&::before': {
        padding: 0,
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: 'none',
        padding: '0 20px',
        '@media (min-width: 1303px)': {
          padding: '0 200px',
        },
        '@media (max-width: 576)': {
          padding: '0 20px',
        },
      },
      colorPrimary: {
        backgroundColor: white,
      },
    },
    // MuiToolbar: {
    //   gutters: {
    //     pdLeft: '12px',
    //     paddingRight: '0',
    //     '@media (min-width: 960px)': {
    //       pdLeft: '200px',
    //       paddingRight: '200px',
    //     },
    //   },
    //   regular: {
    //     '@media (min-width: 960px)': {
    //       height: '80px',
    //     },
    //   },
    // },
    // MuiButton: {
    //   root: {
    //     backgroundColor: black,
    //     '&:hover': {
    //       backgroundColor: darkColor,
    //     },
    //   },
    //   outlined: {
    //     color: white,
    //     borer: 'none',
    //   },
    //   contained: {
    //     color: red,
    //     border: `1px solid ${red}`,
    //     backgroundColor: white,
    //     borderRadius: '50px',
    //     '&:hover': {
    //       backgroundColor: red,
    //       color: white,
    //     },
    //     '&:hover: none': {
    //       backgroundColor: red,
    //       color: white,
    //     },
    //     boxShadow: 'none',
    //   },
    // },
    // MuiCheckbox: {
    //   root: {
    //     marginRight: '5px',
    //   },
    //   colorSecondary: {
    //     color: darkColor,
    //     '&$checked': {
    //       color: darkColor,
    //     },
    //   },
    // },
    // MuiFormLabel: {
    //   root: {
    //     '&$focused': {
    //       color: darkColor,
    //     },
    //   },
    // },
    // MuiOutlinedInput: {
    //   root: {
    //     '&$focused $notchedOutline': {
    //       borderColor: darkColor,
    //       borderWidth: 1,
    //     },
    //     '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
    //       borderColor: darkColor,
    //       // Reset on touch devices, it doesn't add specificity
    //       '@media (hover: none)': {
    //         borderColor: darkColor,
    //       },
    //     },
    //   },
    // },
    // MuiIconButton: {
    //   root: {
    //     '&:hover': {
    //       backgroundColor: firstColor,
    //       color: darkColor,
    //     },
    //   },
    // },
    // MuiBadge: {
    //   badge: {
    //     color: white,
    //   },
    //   anchorOriginTopRightRectangle: {
    //     backgroundColor: `${red} !important`,
    //   },
    // },
    // MuiListItem: {
    //   button: {
    //     '&:focus': {
    //       backgroundColor: red,
    //       color: white,
    //     },
    //   },
    // },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: black,
      main: black,
      dark: white,
      contrastText: white,
    },
    secondary: {
      contrastText: white,
      main: '#fff',
      light: white,
      dark: black,
    },
    common: {
      black,
      white: black,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: black,
        '&:hover': {
          backgroundColor: '#000',
        },
      },
      outlined: {
        color: white,
        borer: 'none',
      },
      contained: {
        color: black,
        border: `1px solid ${black}`,
        backgroundColor: white,
        borderRadius: '50px',
        '&:hover': {
          backgroundColor: black,
          color: white,
        },
        boxShadow: 'none',
      },
    },
    MuiCheckbox: {
      root: {
        marginRight: '5px',
        '&:hover': {
          backgroundColor: black,
        },
      },
      colorSecondary: {
        color: black,
        '&$checked': {
          color: black,
        },
      },
    },
    MuiFormControlLabel: {
      label: {
        color: '#9e9e9e',
        fontWeight: 'bold',
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: black,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          borderColor: black,
          borderWidth: 1,
        },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: black,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            borderColor: black,
          },
        },
      },
    },
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: '#ffffff3b',
        },
      },
    },
    MuiListItem: {
      button: {
        '&:hover': {
          backgroundColor: black,
          // color: white,
        },
      },
    },
    MuiBadge: {
      badge: {
        color: white,
      },
      anchorOriginTopRightRectangle: {
        backgroundColor: `${black} !important`,
      },
    },
    MuiMenu: {
      paper: {
        backgroundColor: white,
      },
    },
  },
});

const Theme = (props: any) => {
  const { children, darkMode } = props;
  let defaultTheme = darkMode ? darkTheme : theme;
  defaultTheme = responsiveFontSizes(defaultTheme);

  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

export const withTheme = (Component: any) => (props: any) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Theme darkMode={darkMode}>
      <Component {...props} darkMode={darkMode} setDarkMode={setDarkMode} />
    </Theme>
  );
};
