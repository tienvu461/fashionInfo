/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { theme, black, pdSM, pdMD, pdLG, pdXL } from 'src/styles/theme';

const useStyles: () => Record<'root' | 'titleSuggestion' | 'btn' | 'nextBtn' | 'textBtn', string> = makeStyles(() => ({
  root: {
    height: 'auto',
    backgroundColor: '#E5E5E5',

    // responsive
    [theme.breakpoints.up('sm')]: {
      padding: pdSM,
      paddingTop: '97px'
    },
    [theme.breakpoints.up('md')]: {
      padding: pdMD,
      paddingTop: '97px'
    },
    [theme.breakpoints.up('lg')]: {
      padding: pdLG,
      paddingTop: '97px'
    },
    [theme.breakpoints.up('xl')]: {
      padding: pdXL,
      paddingTop: '97px'
    },
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
