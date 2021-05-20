/* eslint-disable object-curly-newline */
import { makeStyles } from '@material-ui/core/styles';
import {
  white,
  pdXL,
  pdSM,
  pdLG,
  pdMD,
  theme,
  black,
  gray1,
  blackThin,
} from '../../../../../styles/theme';

const useStyles: () => Record<
  | 'root'
  | 'gridPhoto'
  | 'card'
  | 'paper'
  | 'picture'
  | 'actions'
  | 'left'
  | 'right'
  | 'num'
  | 'information'
  | 'title'
  | 'name'
  | 'value'
  | 'tag'
  | 'tags'
  | 'tagText',
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
  gridPhoto: {},
  card: {
    boxShadow: 'none',
  },
  paper: {
    boxShadow: 'none',
  },
  picture: {
    height: '975px',
    zIndex: 4,
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
  right: {},
  num: {
    fontFamily: 'Roboto Mono',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '24px',
    color: black,
    paddingLeft: '8px',
  },
  information: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '0 0 88px 130px',
  },
  title: {
    letterSpacing: '1px',
    color: black,
    lineHeight: '36px',
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: 'Roboto',
    paddingBottom: '30px',
  },
  name: {
    letterSpacing: '1px',
    color: black,
    lineHeight: '36px',
    fontWeight: 'normal',
    textAlign: 'left',
    fontFamily: 'Roboto',
  },
  value: {
    letterSpacing: '1px',
    color: black,
    lineHeight: '36px',
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: 'Roboto',
  },
  tag: {
    width: 'fit-content',
    background: gray1,
    padding: '3px 15px',
    marginRight: '4px',
    marginBottom: '4px',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '80px',
  },
  tagText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '36px',

    alignItems: 'center',
    letterSpacing: '1px',
    color: blackThin,
  },
}));

export { useStyles as default };
