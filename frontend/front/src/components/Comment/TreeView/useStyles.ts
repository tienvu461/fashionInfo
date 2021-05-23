/* eslint-disable import/no-unresolved */
/* eslint-disable object-curly-newline */
import { makeStyles } from '@material-ui/core/styles';
import { pdXL, pdSM, pdLG, pdMD, theme, black } from 'src/styles/theme';

const useStyles: () => Record<'root' | 'paper' | 'rootTimeline', string> = makeStyles(() => ({
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
  },
  rootTimeline: {
    padding: '0',
    marginTop: '0'
  }
}));

export { useStyles as default };
