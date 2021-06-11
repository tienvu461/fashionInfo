/* eslint-disable import/no-unresolved */
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { theme } from 'src/styles/theme';

const useStyles: () => Record<'root', string> = makeStyles(() => createStyles({
    root: {
      cursor: 'pointer',
      position: 'fixed',
      bottom: '80px',
      right: '10px',

      // the size of the scrollIcon image is 80px 80px
      // responsive

      [theme.breakpoints.down('md')]: {
        right: '0',
      },
      [theme.breakpoints.up('md')]: {
        right: '10px',
      },
      [theme.breakpoints.up('lg')]: {
        right: '10px',
      },
      [theme.breakpoints.up('xl')]: {
        right: '20px',
      },
    },
  }));

export { useStyles as default };
