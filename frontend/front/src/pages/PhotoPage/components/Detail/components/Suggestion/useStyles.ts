/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { theme, black } from 'src/styles/theme';

const useStyles: () => Record<'root' | 'titleSuggestion' | 'btn' | 'nextBtn' | 'textBtn' | 'loading', string> = makeStyles(() => ({
    root: {
      height: 'auto',
      backgroundColor: '#E5E5E5',
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
      padding: '40px 0 80px',
    },
    nextBtn: {
      height: '60px',
      width: 'auto',
      borderRadius: 0,
      padding: '17px 33px',
    },
    textBtn: {
      textTransform: 'initial',
      [theme.breakpoints.down('md')]: {
        fontSize: '30px !important',
      },
      lineHeight: '25px',
      letterSpacing: '2.2px',
      fontWeight: 'normal',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
    },
    loading: {
      marginLeft: '16px',
    },
  }));

export { useStyles as default };
