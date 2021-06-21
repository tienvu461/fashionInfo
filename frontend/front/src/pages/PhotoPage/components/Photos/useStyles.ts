/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import {
  white,
  black,
  gray2,
  theme
} from 'src/styles/theme';

const useStyles: () => Record<
  | 'root'
  | 'backDrop'
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
  | 'textSearch'
  | 'loading'
  | 'skeleton',
  string
> = makeStyles(() => ({
  root: {
    height: 'auto',
    backgroundColor: gray2,
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
  textSearch: {
    fontSize: '120px',
    textAlign: 'left',
    fontFamily: 'Darker Grotesque',
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
  },
  loading: {
    marginLeft: '16px'
  }
}));

export { useStyles as default };
