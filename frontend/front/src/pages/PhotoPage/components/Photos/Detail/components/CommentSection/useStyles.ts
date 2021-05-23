/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { theme, black } from 'src/styles/theme';

const useStyles: () => Record<'root' | 'container', string> = makeStyles(() => ({
  root: {
    height: 'auto',
    // backgroundColor: white,
    color: black,

    // responsive
    [theme.breakpoints.up('sm')]: {
      // padding: pdSM,
      paddingTop: '61px',
    },
    [theme.breakpoints.up('md')]: {
      // padding: pdMD,
      paddingTop: '61px',
    },
    [theme.breakpoints.up('lg')]: {
      // padding: pdLG,
      paddingTop: '61px',
    },
    [theme.breakpoints.up('xl')]: {
      // padding: pdXL,
      paddingTop: '61px',
    },
  },
  container: {
    paddingBottom: '103px',
  },
}));

export { useStyles as default };
