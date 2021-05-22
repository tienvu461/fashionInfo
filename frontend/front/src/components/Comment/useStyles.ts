/* eslint-disable import/no-unresolved */
/* eslint-disable object-curly-newline */
import { makeStyles } from '@material-ui/core/styles';
import { pdXL, pdSM, pdLG, pdMD, theme, black } from 'src/styles/theme';

const useStyles: () => Record<'root' | 'header' | 'headerText' | 'accordion' | 'accordionDetails', string> = makeStyles(
  () => ({
    root: {
      height: 'auto',

      // responsive
      [theme.breakpoints.up('sm')]: {},
      [theme.breakpoints.up('md')]: {},
      [theme.breakpoints.up('lg')]: {},
      [theme.breakpoints.up('xl')]: {},
    },
    header: {
      display: 'flex',
      alignItems: 'center',
    },
    headerText: {
      letterSpacing: '1px',
      color: black,
      lineHeight: '36px',
      fontWeight: 'bold',
      textAlign: 'left',
      fontFamily: 'Roboto',
      paddingRight: '17px',
    },
    accordion: {
      '&.MuiPaper-elevation1': {
        boxShadow: 'none',
      },
    },
    accordionDetails: {
      paddingTop: '62px',
    }
  })
);

export { useStyles as default };
