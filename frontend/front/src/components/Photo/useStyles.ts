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
  // | 'root'
  // | 'backDrop'
  | 'paper'
  | 'picture'
  | 'actions'
  | 'left'
  | 'leftActions'
  | 'right'
  | 'num'
  | 'icon',
  string
> = makeStyles(() => ({
  root: {
    height: 'auto',
    backgroundColor: white,

    // responsive
    [theme.breakpoints.up('sm')]: {
      padding: pdSM,
      paddingTop: '77px',
    },
    [theme.breakpoints.up('md')]: {
      padding: pdMD,
      paddingTop: '77px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: pdLG,
      paddingTop: '77px',
    },
    [theme.breakpoints.up('xl')]: {
      padding: pdXL,
      paddingTop: '77px',
    },
  },
  paper: {},
  picture: {
    height: '600px',
    zIndex: 4,
  },
  gridItem: {
    padding: '0 20px 40px 20px !important',
    [theme.breakpoints.up('sm')]: {
      width: '480px',
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