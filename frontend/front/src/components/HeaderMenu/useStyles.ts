/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { textColor, theme } from 'src/styles/theme';

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
  | 'sectionDesktop'
  | 'iconImg'
  | 'navLinks',
  string
> = makeStyles(() => ({
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
    margin: 'auto'
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
