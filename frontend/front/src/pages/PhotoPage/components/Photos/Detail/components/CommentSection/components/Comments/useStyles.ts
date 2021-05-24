/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { theme } from 'src/styles/theme';

const useStyles: () => Record<
  | 'root'
  | 'paper'
  | 'rootTimeline'
  | 'dotAvatar'
  | 'avatar'
  | 'content'
  | 'timeline'
  | 'nestedTimeline'
  | 'action'
  | 'textStyle'
  | 'actionName'
  | 'actionTime'
  | 'actionReply'
  | 'comment',
  string
> = makeStyles(() => ({
  root: {
    height: 'auto',
    width: '100%',

    // responsive
    [theme.breakpoints.up('sm')]: {},
    [theme.breakpoints.up('md')]: {},
    [theme.breakpoints.up('lg')]: {},
    [theme.breakpoints.up('xl')]: {},

    // fix timeline layout
    '& .MuiTimelineItem-missingOppositeContent': {
      '&:before': {
        display: 'none',
      },
    },
  },
  paper: {
    [theme.breakpoints.up('lg')]: {},
    padding: '16px 40px',
    boxShadow: 'none',
    borderRadius: 0
  },
  rootTimeline: {
    padding: 0,
    marginTop: 0,
  },
  dotAvatar: {
    width: '86px',
    height: '86px',
    marginTop: 0,
    padding: 0,
    color: 'transparent',
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 0,
    paddingLeft: '44px',
  },
  timeline: {
    marginBottom: '15px'
  },
  nestedTimeline: {
    paddingTop: '15px',
  },
  action: {
    display: 'flex',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: '36px',
    letterSpacing: '0.8px',
  },
  actionName: {
    paddingRight: '17px',
    fontWeight: 'bold',
    color: '#2E4A91',
  },
  actionTime: {
    paddingRight: '53px',
    fontWeight: 'normal',
    color: '#616161',
  },
  actionReply: {
    fontWeight: 'normal',
    color: '#616161',
  },
  comment: {
    color: '#000000',
    fontWeight: 'normal',
    letterSpacing: '1px',
    lineHeight: '25px',
    textAlign: 'left',
  },
}));

export { useStyles as default };
