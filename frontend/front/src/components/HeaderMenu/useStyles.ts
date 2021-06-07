/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { textColor, theme } from 'src/styles/theme';

const useStyles: () => Record<
  | 'scrollIcon'
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
  | 'sectionDesktop'
  | 'iconImg'
  | 'navLinks',
  string
> = makeStyles(() => ({
  scrollIcon: {
    // the size of this icons image is  80px 80px
    // responsive
    [theme.breakpoints.down('md')]: {
      // size 48px 48px
      width: '60%',
    },
    [theme.breakpoints.up('md')]: {
      // size 64px 64px
      width: '80%',
    },
    [theme.breakpoints.up('lg')]: {
      // size 48px 48px
      width: '80%',
    },
    [theme.breakpoints.up('xl')]: {
      // size 80px 80px
      width: '100%',
    },
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    marginLeft: '38px',
    cursor: 'pointer',
  },
  navbar: {
    height: '80px',
  },
  header: {
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 'auto',
    height: '80px'
  },
  logo: {
    height: '35px',
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
    fontFamily: 'Roboto',
    letterSpacing: '0.2px',
    fontWeight: 'normal',
  },
  textActive: {
    color: textColor,
    fontWeight: 'bold',
    fontSize: '24px',
    fontFamily: 'Roboto',
    letterSpacing: '0.2px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 15px',
  },
  iconImg: {
    height: '40px',
    width: '40px',
    borderRadius: '25px',
  },
  icon: { marginLeft: '38px', cursor: 'pointer' },
}));

export { useStyles as default };
