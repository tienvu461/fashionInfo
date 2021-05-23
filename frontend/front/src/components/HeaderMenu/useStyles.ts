/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { textColor, pdSM, pdMD, pdLG, pdXL, theme } from 'src/styles/theme';

const useStyles: () => Record<
  | 'root'
  | 'navbar'
  | 'header'
  | 'logo'
  | 'links'
  | 'icon'
  | 'actions'
  | 'linkText'
  | 'textNonActive'
  | 'textActive'
  | 'navLinks',
  string
> = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    height: '80px',
  },
  header: {
    width: '100%',
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    // responsive
    [theme.breakpoints.up('sm')]: {
      padding: pdSM,
    },
    [theme.breakpoints.down('sm')]: {
      padding: pdSM,
    },
    [theme.breakpoints.up('md')]: {
      padding: pdMD,
    },
    [theme.breakpoints.up('lg')]: {
      padding: pdLG,
    },
    [theme.breakpoints.up('xl')]: {
      padding: pdXL,
    },
  },
  logo: {
    height: 'fit-content',
    cursor: 'pointer',
  },
  links: {
    width: '374px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '374px',
    '&:active': {
      backgroundColor: 'transparent',
    },
  },
  linkText: {
    textDecoration: 'none',
  },
  textNonActive: {
    color: textColor,
    fontSize: '24px',
  },
  textActive: {
    color: textColor,
    fontWeight: 'bold',
    fontSize: '24px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: { marginLeft: '38px', cursor: 'pointer' },
}));

export { useStyles as default };
