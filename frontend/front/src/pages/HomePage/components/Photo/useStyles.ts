/* eslint-disable object-curly-newline */
import { makeStyles } from '@material-ui/core/styles';
import { gray, pdXL, pdSM, pdLG, pdMD, theme } from '../../../../styles/theme';

const useStyles: () => Record<
  | 'root'
  | 'card'
  | 'paper'
  | 'picture'
  | 'gridItem'
  | 'actions'
  | 'cardActions'
  | 'left'
  | 'leftActions'
  | 'right'
  | 'icon',
  string
> = makeStyles(() => ({
  root: {
    height: 'auto',
    backgroundColor: gray,

    // responsive
    [theme.breakpoints.up('sm')]: {
      padding: pdSM,
    },
    [theme.breakpoints.up('md')]: {
      padding: pdMD,
    },
    [theme.breakpoints.up('lg')]: {
      padding: pdLG,
    },
    [theme.breakpoints.up('xl')]: {
      padding: pdXL,
    },
  },
  card: {},
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
    height: '80px',
    '&.MuiCardActions-root': {
      padding: '0 30px',
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  right: {},
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
