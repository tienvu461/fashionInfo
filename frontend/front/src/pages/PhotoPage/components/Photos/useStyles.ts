/* eslint-disable object-curly-newline */
import { makeStyles } from '@material-ui/core/styles';
import { white, pdXL, pdSM, pdLG, pdMD, theme } from '../../../../styles/theme';

const useStyles: () => Record<
  | 'root'
  | 'card'
  | 'paper'
  | 'picture'
  | 'gridItem'
  | 'actions'
  | 'hoverAction'
  | 'cardActions'
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
  card: {
    position: 'relative',
  },
  paper: {},
  picture: {
    height: '600px',
  },
  gridItem: {
    padding: '0 20px 40px 20px !important',
    [theme.breakpoints.up('sm')]: {
      width: '480px',
    },
  },
  cardActions: {
    display: 'none',
  },
  hoverAction: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  actions: {
    height: '80px',
    padding: '0 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#EEEEEE',
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
