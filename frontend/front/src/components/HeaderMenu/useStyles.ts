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
  | 'navLinks',
  string
> = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    padding: '0 200px',
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
  },
  linkText: {
    textDecoration: 'none',
    color: '#373F41',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: { marginLeft: '50px' },
}));

export { useStyles as default };
