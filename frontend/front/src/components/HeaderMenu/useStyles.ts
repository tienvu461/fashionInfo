/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { makeStyles, Theme } from '@material-ui/core/styles';
import { textMenu } from '../../styles/theme';

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
    color: textMenu,
    fontSize: '24px',
  },
  textActive: {
    color: textMenu,
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
