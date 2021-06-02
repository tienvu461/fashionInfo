/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import {
  white,
  black,
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
  | 'skeleton',
  string
> = makeStyles(() => ({
  root: {
    height: 'auto',
    backgroundColor: white,
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
    width: '220px',
  },
  textBtn: {
    textTransform: 'initial',
    paddingBottom: '6px',
    [theme.breakpoints.down('md')]: {
      fontSize: '30px !important'
    }
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
