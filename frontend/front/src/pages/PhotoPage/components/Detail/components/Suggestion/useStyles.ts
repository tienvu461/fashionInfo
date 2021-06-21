/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { theme, black } from 'src/styles/theme';

const useStyles: () => Record<'root' | 'titleSuggestion' | 'btn', string> = makeStyles(() => ({
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
  }));

export { useStyles as default };
