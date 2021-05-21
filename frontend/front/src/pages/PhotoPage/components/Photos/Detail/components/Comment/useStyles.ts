/* eslint-disable object-curly-newline */
import { makeStyles } from '@material-ui/core/styles';
import { white, pdXL, pdSM, pdLG, pdMD, theme, black } from '../../../../../../../styles/theme';

const useStyles: () => Record<'root', string> = makeStyles(() => ({
  root: {
    height: 'auto',
    // backgroundColor: white,
    color: black,

    // responsive
    [theme.breakpoints.up('sm')]: {
      padding: pdSM,
      paddingTop: '77px',
    },
    [theme.breakpoints.up('md')]: {
      padding: pdMD,
      paddingTop: '77px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: pdLG,
      paddingTop: '77px',
    },
    [theme.breakpoints.up('xl')]: {
      padding: pdXL,
      paddingTop: '77px',
    },
  },
}));

export { useStyles as default };
