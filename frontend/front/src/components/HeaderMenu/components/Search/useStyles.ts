import { makeStyles, Theme, fade } from '@material-ui/core/styles';

const useStyles: () => Record<'search' | 'not' | 'placeHolderInput' | 'searchIcon' | 'inputInput', string> = makeStyles(
  (theme: Theme) => ({
    search: {
      // position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': { backgroundColor: fade(theme.palette.common.white, 0.25) },
      marginLeft: 0,
      // width: '100% !important',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: '15px',
      },
    },
    searchIcon: {
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'flex-end',
      marginBottom: '8px',
      pointerEvents: 'none',
      color: '#474747',
    },
    inputInput: {
      paddingLeft: '53px',
      width: '50vh',
      fontSize: '18px',
      fontFamily: 'Roboto',
      transition: theme.transitions.create('width'),
      '&.Mui-focused': {
        width: '50vh',
      },
      '&.MuiInput-underline:before': {
        display: 'none',
      },
    },
    not: {
      position: 'relative',
      width: 0,
      paddingLeft: '53px',
      transition: theme.transitions.create('width'),
      '&.MuiInput-underline:before': {
        display: 'none',
      },
    },
    placeHolderInput: {
      '&::placeholder': {
        fontSize: '24px',
      },
    },
    // searchIcon: {
    //   height: '100%',
    //   position: 'absolute',
    //   pointerEvents: 'none',
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   color: '#474747',
    // },
    // inputRoot: { color: 'inherit' },
    // inputInput: {
    //   // vertical padding + font size from searchIcon
    //   paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    //   transition: theme.transitions.create('width'),
    //   width: '100%',
    //   [theme.breakpoints.up('sm')]: {
    //     width: '0ch',
    //     '&:focus': { width: '20ch' },
    //   },
    // },
  })
);

export { useStyles as default };
