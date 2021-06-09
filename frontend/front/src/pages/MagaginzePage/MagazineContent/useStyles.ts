/* eslint-disable import/no-unresolved */
import { white, gray2, theme } from 'src/styles/theme';
import { makeStyles } from '@material-ui/core/styles';

const useStyles: () => Record<
  | 'container'
  | 'entertaimentHeader'
  | 'author'
  | 'entertaimentTitle'
  | 'headerTitle'
  | 'headerSubTitle'
  | 'authorName'
  | 'authorTime'
  | 'divide',
  string
> = makeStyles(() => ({
  container: {
    backgroundColor: gray2,
  },
  entertaimentHeader: {
    backgroundColor: white,
    display: 'flex',
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '45px',
    [theme.breakpoints.down('md')]: {
      paddingTop: '30px',
    },
  },
  entertaimentTitle: {
    textAlign: 'left',
  },
  headerTitle: {
    fontFamily: 'Darker Grotesque',
    fontStyle: 'normal',
    fontWeight: 900,

    [theme.breakpoints.down('md')]: {
      fontSize: '35px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '35px',
      letterSpacing: '3.2px',
    },
    [theme.breakpoints.up('lg')]: {
      lineHeight: '60px',
      fontSize: '40px',
    },
    [theme.breakpoints.up('xl')]: {
      lineHeight: '115px',
      fontSize: '40px',
    },

    color: '#000000',
  },
  headerSubTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',

    lineHeight: '23px',
    letterSpacing: '0.7px',
    paddingTop: '17px',

    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '22px',
    },

    color: '#000000',
  },
  authorName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',

    lineHeight: '33px',
    letterSpacing: '0.991666px',
    paddingRight: '26px',

    color: '#000000',
  },
  authorTime: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',

    lineHeight: '33px',
    letterSpacing: '0.991666px',
    paddingLeft: '26px',

    color: '#000000',
  },
  divide: {
    width: '60px',
    borderBottom: '1px solid #000000',
  },
}));

export { useStyles as default };
