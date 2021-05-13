/* eslint-disable object-curly-newline */
import { makeStyles } from '@material-ui/core/styles';
import { gray, pdXL, pdSM, pdLG, pdMD, theme } from '../../../../styles/theme';

const useStyles: () => Record<
  'root' | 'card' | 'paper' | 'picture' | 'gridItem',
  string
> = makeStyles(() => ({
  root: {
    height: 'auto',
    backgroundColor: gray,

    // responsive
    [theme.breakpoints.up('sm')]: {
      padding: pdSM,
    },
    [theme.breakpoints.up('md')]: {
      padding: pdMD,
    },
    [theme.breakpoints.up('lg')]: {
      padding: pdLG,
    },
    [theme.breakpoints.up('xl')]: {
      padding: pdXL,
    },
  },
  card: {},
  paper: {},
  picture: {
    height: '600px',
  },
  gridItem: {
    padding: '0 20px 40px 20px !important',
  },
}));

export { useStyles as default };
