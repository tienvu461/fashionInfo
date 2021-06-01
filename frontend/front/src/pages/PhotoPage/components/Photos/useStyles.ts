/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import {
  white,
  pdXL,
  pdSM,
  pdLG,
  pdMD,
  theme,
  black,
} from 'src/styles/theme';

const useStyles: () => Record<
  | 'root'
  | 'container'
  | 'backDrop'
  | 'gridItem'
  | 'actions'
  | 'left'
  | 'leftActions'
  | 'right'
  | 'num'
  | 'icon'
  | 'btn'
  | 'nextBtn'
  | 'textBtn'
  | 'loadingPhoto'
  | 'skeleton',
  string
> = makeStyles(() => ({
  root: {
    height: 'auto',
    backgroundColor: white,
    display: 'flex',
    justifyContent: 'center',

    // responsive
    [theme.breakpoints.up('sm')]: {
      padding: pdMD, // 50px
      paddingTop: '77px',
    },

    // >= 1080
    [theme.breakpoints.up('md')]: {
      padding: pdMD, // 50px
      paddingTop: '77px',
    },

    // >= 1280
    [theme.breakpoints.up('lg')]: {
      padding: pdLG, // 100px
      paddingTop: '77px',
    },

    // >= 1920
    [theme.breakpoints.up('xl')]: {
      padding: pdXL, // 200px
      paddingTop: '77px',
    },
  },
  container: {
    // x < 1080
    [theme.breakpoints.up('md')]: {
      width: '800px',
      backgroundColor: 'blue',
    },
    // x >= 1080
    [theme.breakpoints.up('md')]: {
      width: '1160px',
      backgroundColor: 'blue',
    },

    // 1560 <= x < 1920
    [theme.breakpoints.up('lg')]: {
      width: '1160px',
      backgroundColor: 'green',
    },

    // >= 1920
    [theme.breakpoints.up('xl')]: {
      width: '1520px',
      backgroundColor: 'red',
    },
  },
  gridItem: {
    // < 1080
    [theme.breakpoints.up('xs')]: {
      width: '240px',
      height: '300px',
    },
    // >= 1080
    [theme.breakpoints.up('md')]: {
      width: '480px',
      height: '600px',
    },

    // 1560 <= x < 1920
    [theme.breakpoints.up('lg')]: {
      width: '360px',
      height: '450px',
    },

    // >= 1920
    [theme.breakpoints.up('xl')]: {
      width: '480px',
      height: '600px',
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px',
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  right: { cursor: 'pointer' },
  leftActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '30px',
  },
  icon: {
    paddingRight: '8px',
    cursor: 'pointer',
  },
  num: {
    fontFamily: 'Roboto Mono',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '24px',
    color: black,
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
  backDrop: {
    width: '100%',
    zIndex: 1,
    color: white,
  },
  skeleton: {
    padding: '100px 0',
    width: '100%',
  },
  loadingPhoto: {},
}));

export { useStyles as default };
