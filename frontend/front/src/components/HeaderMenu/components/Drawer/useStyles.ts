/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import { makeStyles, Theme } from '@material-ui/core/styles';
import { black } from 'src/styles/theme';

const useStyles: () => Record<
  'menuBtn' | 'drawer' | 'search' | 'list' | 'subList' | 'linkText' | 'icon' | 'listItemIcon',
  string
> = makeStyles((theme: Theme) => ({
  list: { width: '250px' },
  subList: { paddingLeft: '20px' },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: black,
  },
  icon: {},
  menuBtn: {
    height: '80px',
    color: '#000',
    cursor: 'pointer',
  },
  drawer: {
    width: '100%',
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  search: {
    // width: '200px'
  }
}));

export { useStyles as default };
