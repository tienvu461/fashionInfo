/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { black } from 'src/styles/theme';

const useStyles: () => Record<'titleHeadLine' | 'menuTab', string> = makeStyles(() => ({
  titleHeadLine: {
    fontStyle: 'normal',
    fontWeight: 900,
    lineHeight: '115px',
    textAlign: 'left',
    letterSpacing: '3.2px',

    color: black,
  },
  menuTab: {
    textAlign: 'left',
    padding: 0,
    color: '#373F41',
    letterSpacing: '0.2px',
    fontWeight: 'normal',
    lineHeight: '18px',
    fontSize: '24px',

    fontStyle: 'normal',
    fontFamily: 'Roboto',

    '& .MuiTab-wrapper': {
      alignItems: 'baseline',
    },
  },
}));

export { useStyles as default };
