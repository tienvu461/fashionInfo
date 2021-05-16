/* eslint-disable object-curly-newline */
import { makeStyles } from '@material-ui/core/styles';
import { white, pdXL, pdSM, pdLG, pdMD, theme } from '../../../../styles/theme';

const useStyles: () => Record<
  | 'root'
  | 'paper'
  | 'picture'
  | 'gridItem'
  | 'actions'
  | 'left'
  | 'leftActions'
  | 'right'
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
}));

export { useStyles as default };