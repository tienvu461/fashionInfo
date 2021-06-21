/* eslint-disable import/no-unresolved */
import { white, gray2, theme } from 'src/styles/theme';
import { makeStyles } from '@material-ui/core/styles';

const useStyles: () => Record<
  | 'container'
  | 'magazineHeader'
  | 'author'
  | 'magazineTitle'
  | 'headerTitle'
  | 'headerSubTitle'
  | 'authorName'
  | 'authorTime'
  | 'topic'
  | 'divide'
  | 'btn'
  | 'nextBtn'
  | 'loading'
  | 'textBtn',
  string
> = makeStyles(() => ({
  container: {
    backgroundColor: gray2,
  },
  magazineHeader: {
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
  magazineTitle: {
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
  topic: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '26px',
    lineHeight: '107px',
    letterSpacing: '2.2px',
    textAlign: 'left',
    paddingTop: '30px',

    color: '#000000',
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
