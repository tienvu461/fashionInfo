/* eslint-disable object-curly-newline */
import { makeStyles } from '@material-ui/core/styles';
import { white, pdXL, pdSM, pdLG, pdMD, theme, black } from '../../../../../../../styles/theme';

// eslint-disable-next-line operator-linebreak
const useStyles: () => Record<'root' | 'titleSuggestion' | 'btn' | 'nextBtn' | 'textBtn' | 'gridItem', string> =
  makeStyles(() => ({
    root: {},
    titleSuggestion: {
      height: 'auto',
      color: black,
      textAlign: 'left',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '30px',
      lineHeight: '36px',

      // responsive
      [theme.breakpoints.up('sm')]: {
        paddingTop: '97px',
        paddingLeft: '12px',
        paddingBottom: '40px',
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: '97px',
        paddingLeft: '12px',
        paddingBottom: '40px',
      },
      [theme.breakpoints.up('lg')]: {
        paddingTop: '97px',
        paddingLeft: '12px',
        paddingBottom: '40px',
      },
      [theme.breakpoints.up('xl')]: {
        paddingTop: '97px',
        paddingLeft: '12px',
        paddingBottom: '40px',
      },
    },
    btn: {
      padding: '40px 0',
    },
    nextBtn: {
      height: '60px',
      width: '220px',
      marginRight: '20px',
    },
    textBtn: {
      textTransform: 'initial',
      paddingBottom: '6px',
    },
    gridItem: {
      padding: '0 20px 40px 20px !important',
      [theme.breakpoints.up('sm')]: {
        width: '480px',
      },
    },
  }));

export { useStyles as default };
