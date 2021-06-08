/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { black, theme } from 'src/styles/theme';

const useStyles: () => Record<'titleHeadLine' | 'tab' | 'menuTab' | 'content', string> = makeStyles(() => ({
  titleHeadLine: {
    fontStyle: 'normal',
    fontWeight: 900,
    lineHeight: '115px',
    textAlign: 'left',
    letterSpacing: '3.2px',

    color: black,
  },
  tab: {
    [theme.breakpoints.up('xs')]: {
      '& .MuiTabs-flexContainer': {
        flexWrap: 'wrap'
      }
    },
  },
  menuTab: {
    textAlign: 'left',
    padding: 0,
    color: '#373F41',
    letterSpacing: '0.2px',
    fontWeight: 'normal',
    lineHeight: '18px',
    fontSize: '24px',
    textTransform: 'inherit',
    minWidth: 0,
    marginRight: '89px',

    fontStyle: 'normal',
    fontFamily: 'Roboto',

    '& .MuiTab-wrapper': {
      alignItems: 'baseline',
    },
  },
  content: {
    backgroundColor: '#E5E5E5',
    height: 'fit-content',
    width: '100%',
  },
}));

export { useStyles as default };
