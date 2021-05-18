/* eslint-disable object-curly-newline */
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../../../styles/theme';

const useStyles: () => Record<'root' | 'scrollIcon', string> = makeStyles(
  () => ({
    root: {
      cursor: 'pointer',
      position: 'absolute',
      bottom: '26px',

      // the size of the scrollIcon image is 80px 80px
      // responsive

      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      [theme.breakpoints.up('md')]: {
        // size 48px 48px
        right: '-12px',
        display: 'block',
      },
      [theme.breakpoints.up('lg')]: {
        // size 64px 64px
        right: '18px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },
      [theme.breakpoints.up('xl')]: {
        // 80px 80px
        right: '60px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },
    },
    scrollIcon: {
      // the size of this icons image is  80px 80px
      // responsive
      [theme.breakpoints.up('md')]: {
        // size 48px 48px
        width: '60%',
      },
      [theme.breakpoints.up('lg')]: {
        // size 64px 64px
        width: '80%',
      },
    },
  })
);

export { useStyles as default };
