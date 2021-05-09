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
export const black = '#000';
export const firstColor = '#0000000a';
export const secondColor = '#ffffff87';
export const darkColor = '#484848';
export const blue = '#00B0FF';
export const red = '#F50057';
export const purple = '#6C63FF';

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
      main: red,
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
      black: firstColor,
      white: secondColor,
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
    h6: {
      fontSize: '0.8rem',
      '@media (min-width:1302px)': {
        fontSize: '1.2rem',
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
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: 'none',
      },
      colorPrimary: {
        backgroundColor: white,
      },
    },
    MuiToolbar: {
      gutters: {
        paddingLeft: '12px',
        paddingRight: '0',
        '@media (min-width: 960px)': {
          paddingLeft: '200px',
          paddingRight: '200px',
        },
      },
      regular: {
        '@media (min-width: 960px)': {
          height: '80px',
        },
      },
    },
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
      light: darkColor,
      main: red,
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
      black: secondColor,
      white: firstColor,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: red,
        '&:hover': {
          backgroundColor: '#000',
        },
      },
      outlined: {
        color: white,
        borer: 'none',
      },
      contained: {
        color: red,
        border: `1px solid ${red}`,
        backgroundColor: white,
        borderRadius: '50px',
        '&:hover': {
          backgroundColor: red,
          color: white,
        },
        boxShadow: 'none',
      },
    },
    MuiCheckbox: {
      root: {
        marginRight: '5px',
        '&:hover': {
          backgroundColor: red,
        },
      },
      colorSecondary: {
        color: red,
        '&$checked': {
          color: red,
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
          color: red,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          borderColor: red,
          borderWidth: 1,
        },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: red,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            borderColor: red,
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
          backgroundColor: red,
          // color: white,
        },
      },
    },
    MuiBadge: {
      badge: {
        color: white,
      },
      anchorOriginTopRightRectangle: {
        backgroundColor: `${red} !important`,
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
