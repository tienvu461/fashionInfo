/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { theme } from 'src/styles/theme';

const useStyles: () => Record<
  | 'paper'
  | 'rootTimeline'
  | 'dotAvatar'
  | 'avatar'
  | 'content'
  | 'timeline'
  | 'timelineTwo'
  | 'textStyle'
  | 'actionName'
  | 'textArea'
  | 'inputTextArea',
  string
> = makeStyles(() => ({
  paper: {
    [theme.breakpoints.up('lg')]: {},
    padding: '16px 40px',
    boxShadow: 'none',
    borderRadius: 0,

    // responsive
    [theme.breakpoints.down('sm')]: {
      padding: '8px 20px',
    },
  },
  rootTimeline: {
    padding: 0,
    marginTop: '-15px',
  },
  timeline: {
    padding: 0,
    paddingTop: '15px',
    paddingLeft: 0,
  },
  timelineTwo: {
    padding: 0,
    paddingTop: '15px',
    paddingLeft: '15px',
  },
  dotAvatar: {
    width: '86px',
    height: '86px',
    marginTop: 0,
    padding: 0,
    color: 'transparent',
    backgroundColor: 'transparent',
    boxShadow: 'none',

    // responsive
    [theme.breakpoints.down('sm')]: {
      width: '46px',
      height: '46px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '46px',
      height: '46px',
    },
    [theme.breakpoints.up('md')]: {
      width: '60px',
      height: '60px',
    },
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 0,
    paddingLeft: '44px',
    // responsive
    [theme.breakpoints.down('md')]: {
      paddingLeft: '20px',
    },
  },
  textStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: '36px',
    letterSpacing: '0.8px',
  },
  actionName: {
    paddingRight: '40px',
    fontWeight: 'bold',
    color: '#2E4A91',
    textAlign: 'left',
  },
  actionReply: {
    fontWeight: 'normal',
    color: '#616161',
    cursor: 'pointer',
  },
  textArea: {
    width: '100%',
    border: 'none',
    paddingBottom: '24px',
    fontSize: '18px',
    '& .MuiInput-underline:before': {
      display: 'none',
    },
  },
  inputTextArea: {
    '&::placeholder': {
      fontStyle: 'italic',
      fontSize: '18px',
    },
  },
}));

export { useStyles as default };