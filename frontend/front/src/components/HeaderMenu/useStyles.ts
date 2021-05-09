import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles: () => Record<
  'root' | 'header' | 'logo' | 'links' | 'menu' | 'icon' | 'actions',
  string
> = makeStyles((theme: Theme) => ({
  root: {
    padding: '0 200px',
  },
  header: {
    width: '100%',
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
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
  menu: {
    margin: '0 10px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: { marginLeft: '50px' },
}));

export { useStyles as default };
