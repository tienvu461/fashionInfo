/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { theme, black, pdSM } from 'src/styles/theme';

const useStyles: () => Record<
'root'
| 'titleSuggestion'
| 'btn' | 'nextBtn'
| 'textBtn',
string> = makeStyles(() => ({
    root: {
      height: 'auto',
    },
    titleSuggestion: {
      color: black,
      textAlign: 'left',
      fontStyle: 'normal',
      fontWeight: 'bold',
      lineHeight: '36px',
      letterSpacing: '1px',
      fontFamily: 'Roboto',

      // // responsive
      [theme.breakpoints.up('sm')]: {
        paddingBottom: '40px',
      },
      [theme.breakpoints.down('sm')]: {
        paddingBottom: '40px',
      },
    },
    btn: {
      padding: '40px 0',
    },
    nextBtn: {
      height: '60px',
      width: '220px',
    },
    textBtn: {
      textTransform: 'initial',
      paddingBottom: '6px',
    },
  }));

export { useStyles as default };
