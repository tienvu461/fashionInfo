/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { theme, black, pdSM } from 'src/styles/theme';

const useStyles: () => Record<
'root'
| 'titleSuggestion'
| 'btn' | 'nextBtn'
| 'textBtn'
| 'gridItem',
string> = makeStyles(() => ({
    root: {
      height: 'auto',
      // responsive
      [theme.breakpoints.up('sm')]: {
        paddingTop: '97px',
        paddingBottom: '40px',
      },
      [theme.breakpoints.down('sm')]: {
        paddingTop: '97px',
        padding: pdSM,
        paddingBottom: '40px',
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: '97px',
        paddingBottom: '40px',
      },
      [theme.breakpoints.up('lg')]: {
        paddingTop: '97px',
        paddingBottom: '40px',
      },
      [theme.breakpoints.up('xl')]: {
        paddingTop: '97px',
        paddingBottom: '40px',
      },
    },
    titleSuggestion: {
      height: 'auto',
      color: black,
      textAlign: 'left',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '30px',
      lineHeight: '36px',

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
