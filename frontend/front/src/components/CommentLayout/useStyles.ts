/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { theme, black, pdSM } from 'src/styles/theme';

const useStyles: () => Record<
  | 'root'
  | 'header'
  | 'headerText'
  | 'accordion'
  | 'accordionHeader'
  | 'accordionDetails'
  | 'expandLess'
  | 'expandMore'
  | 'subText'
  | 'spanText',
  string
> = makeStyles(() => ({
  root: {
    height: 'auto',

    // responsive
    [theme.breakpoints.up('sm')]: {
      paddingRight: '50px',
      paddingTop: '0 !important',
    },
    [theme.breakpoints.down('sm')]: {
      padding: pdSM,
      paddingTop: '40px',
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: '130px',
    },
    [theme.breakpoints.up('lg')]: {
      paddingRight: '130px',
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: '130px',
    },
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
  accordionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    // responsive
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  accordionDetails: {
    paddingTop: '62px',
  },
  expandLess: {
    transform: 'rotate(0deg)',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontSize: '40px',
  },
  expandMore: {
    transform: 'rotate(180deg)',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontSize: '40px',
  },
  subText: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#616161',

    // responsive
    [theme.breakpoints.down('sm')]: {
      paddingTop: '20px',
    },
  },
  spanText: {
    fontStyle: 'normal',
    color: '#2E4A91',
  },
}));

export { useStyles as default };
