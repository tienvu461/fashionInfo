/* eslint-disable import/no-unresolved */
/* eslint-disable object-curly-newline */
import { makeStyles } from '@material-ui/core/styles';
import { pdSM, theme, black, white, blackBlue } from 'src/styles/theme';

const useStyles: () => Record<
  'root' | 'titleReporter' | 'paragraph' | 'reporterInfo' | 'avatar' | 'name' | 'reporterImg',
  string
> = makeStyles(() => ({
  root: {
    height: 'auto',

    // responsive
    [theme.breakpoints.down('sm')]: {
      padding: pdSM,
      paddingTop: '40px'
    },
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
    [theme.breakpoints.up('md')]: {
    },
    [theme.breakpoints.up('lg')]: {},
    [theme.breakpoints.up('xl')]: {},
  },
  titleReporter: {
    letterSpacing: '1px',
    color: black,
    lineHeight: '36px',
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: 'Roboto',
    paddingBottom: '30px',
  },
  paragraph: {
    letterSpacing: '1px',
    color: black,
    lineHeight: '36px',
    fontWeight: 'normal',
    textAlign: 'left',
    fontFamily: 'Roboto',
    paddingBottom: '55px',
  },
  reporterInfo: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '20px',
  },
  avatar: {
    backgroundColor: '#192038',
    color: white,
    fontSize: '30px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    height: '56px',
    width: '56px',

    // responsive
    [theme.breakpoints.down('sm')]: {
      height: '40px',
      width: '40px',
      fontSize: '24px',
    },
    [theme.breakpoints.up('md')]: {},
    [theme.breakpoints.up('lg')]: {},
    [theme.breakpoints.up('xl')]: {},
  },
  name: {
    paddingLeft: '73px',
    letterSpacing: '1px',
    color: blackBlue,
    lineHeight: '36px',
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: 'Roboto',

    // responsive
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '13px',
    },
  },
  reporterImg: {
    width: '100%',
    // height: 'fit-content'
  },
}));

export { useStyles as default };
