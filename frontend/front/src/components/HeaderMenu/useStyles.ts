import { makeStyles, Theme } from '@material-ui/core/styles';

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
> = makeStyles((theme: Theme) => ({
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
    color: '#373F41',
    fontSize: '24px',
  },
  textActive: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: '24px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: { marginLeft: '50px' },
}));

export { useStyles as default };