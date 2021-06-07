/* eslint-disable react/jsx-props-no-spreading */
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import React, { useState } from 'react';

export const white = '#fff';
export const black = '#000000';
export const blackThin = '#474747';
export const blackBlue = '#2E4A90';
export const grayPrimary = '#C4C4C4';
export const gray = '#EEEEEE';
export const gray1 = '#EFEFEF';
export const gray2 = '#E5E5E5;';
export const textColor = '#373F41';

// padding (view + responsive)
export const pdXL = '0 200px';
export const pdLG = '0 100px';
export const pdMD = '0 40px';
export const pdSM = '0 20px';

export const pdLeftXL = '200px'; // view
export const pdLeftLG = '100px'; // view
export const pdLeftMD = '40px'; // view
export const pdLeftSM = '20px'; // view

export const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: '300',
  lineHeight: '1.5em',
};

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: gray,
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
    fontFamily: ['Darker Grotesque', 'sans-serif'].join(','),
    h6: {
      fontSize: '18px',
      '@media (max-width:1080px)': { fontSize: '16px' },
      '@media (max-width:960px)': { fontSize: '14px' },
    },
    h5: {
      fontSize: '20px',
      '@media (min-width:1080px)': { fontSize: '18px' },
      '@media (min-width:600px)': { fontSize: '16px' },
      '@media (max-width:600px)': { fontSize: '14px' },
    },
    h4: {
      fontSize: '30px',
      '@media (min-width:960px)': { fontSize: '30px' },
      '@media (max-width:960px)': { fontSize: '24px' },
      '@media (max-width:600px)': { fontSize: '20px' },
    },
    h2: {
      fontSize: '96px',
      '@media (max-width:1080px)': { fontSize: '80px' },
      '@media (max-width:960px)': { fontSize: '2.24rem' },
      '@media (max-width:720px)': { fontSize: '1.92rem' },
    },
    h1: {
      fontSize: '120px',
      '@media (max-width:1080px)': { fontSize: '100px' },
      '@media (max-width:960px)': { fontSize: '2.8rem' },
      '@media (max-width:720px)': { fontSize: '2.4rem' },
      '&::before': { padding: 0 },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1080,
      lg: 1280,
      xl: 1920,
    },
  },
  overrides: {
    MuiAppBar: {
      root: { boxShadow: 'none', height: '80px' },
      colorPrimary: { backgroundColor: white },
    },
    MuiButton: {
      root: {
        backgroundColor: black,
        '&:hover': { backgroundColor: grayPrimary },
      },
      contained: {
        color: white,
        border: `1px solid ${black}`,
        backgroundColor: black,
        '&:hover': {
          backgroundColor: grayPrimary,
          color: black,
          border: 'transparent',
        },
        boxShadow: 'none',
      },
    },
    MuiCircularProgress: { colorPrimary: { color: grayPrimary } },
    MuiAccordion: { root: { backgroundColor: 'transparent' } },
    MuiAccordionSummary: {
      content: {
        margin: '0 !important',
      },
      root: { minHeight: 'fit-content !important', padding: 0 },
    },
    MuiAccordionDetails: { root: { padding: '0' } },
    MuiTab: {
      root: {
        '&$selected': {
          fontWeight: 900
        },
      },
    },
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
        '&:hover': { backgroundColor: '#000', },
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
        '&:hover': { backgroundColor: black, },
      },
      colorSecondary: {
        color: black,
        '&$checked': { color: black, },
      },
    },
    MuiFormControlLabel: {
      label: {
        color: '#9e9e9e',
        fontWeight: 'bold',
      },
    },
    MuiFormLabel: { root: { '&$focused': { color: black, }, }, },
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          borderColor: black,
          borderWidth: 1,
        },
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: black,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': { borderColor: black, },
        },
      },
    },
    MuiIconButton: { root: { '&:hover': { backgroundColor: '#ffffff3b', }, }, },
    MuiListItem: {
      button: {
        '&:hover': {
          backgroundColor: black,
          // color: white,
        },
      },
    },
    MuiBadge: {
      badge: { color: white, },
      anchorOriginTopRightRectangle: { backgroundColor: `${black} !important`, },
    },
    MuiMenu: { paper: { backgroundColor: white, }, },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Theme = (props: any) => {
  const { children, darkMode } = props;
  let defaultTheme = darkMode ? darkTheme : theme;
  defaultTheme = responsiveFontSizes(defaultTheme);

  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withTheme = (Component: React.FunctionComponent): React.FC => (props: any) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Theme darkMode={darkMode}>
      <Component {...props} darkMode={darkMode} setDarkMode={setDarkMode} />
    </Theme>
  );
};
