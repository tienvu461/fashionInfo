import { makeStyles, Theme, fade } from '@material-ui/core/styles';

const useStyles: () => Record<
  | 'search'
  | 'not'
  | 'placeHolderInput'
  | 'searchIcon'
  | 'inputDesktop'
  | 'mobile'
  | 'inputMobile'
  | 'searchIconMobile'
  | 'clearMobileSearch'
  | 'clearDesktopSearch'
  | 'loadingIcon'
  | 'searchMobile',
  string
> = makeStyles((theme: Theme) => ({
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
  inputDesktop: {
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
  mobile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 12px',
  },
  searchMobile: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgb(145 145 145 / 15%)',
    '&:hover': {
      backgroundColor: 'rgb(145 145 145 / 25%);',
    },
    marginTop: '12px',
    padding: '4px 0',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
  searchIconMobile: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    top: 0,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputMobile: {
    // paddingBottom: '12px',
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  clearDesktopSearch: {
    cursor: 'pointer',
  },
  clearMobileSearch: {
    cursor: 'pointer',
    width: '12px',
    height: '12px',
    marginRight: '16px',
  },
  loadingIcon: {
    display: 'flex'
  }
}));

export { useStyles as default };
