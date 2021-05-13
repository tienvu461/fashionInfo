import { makeStyles } from '@material-ui/core/styles';
import {
  black,
  grayPrimary,
  pdLeftXL,
  pdLeftLG,
  pdLeftMD,
  pdLeftSM,
  theme,
} from '../../../../styles/theme';

const useStyles: () => Record<
  | 'root'
  | 'leftSection'
  | 'leftSectionMatches'
  | 'rightSection'
  | 'footerSection'
  | 'footerSectionMatches'
  | 'headline'
  | 'subline',
  string
> = makeStyles(() => ({
  root: {
    width: '100%',
    height: 'auto',
  },
  leftSection: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'flex-end',

    // responsive
    [theme.breakpoints.up('sm')]: {
      paddingLeft: pdLeftSM,
    },
    [theme.breakpoints.up('md')]: {
      padding: pdLeftMD,
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: pdLeftLG,
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: pdLeftXL,
    },
  },
  headline: {
    fontFamily: 'Darker Grotesque',
    fontStyle: 'normal',
    fontWeight: 900,
    marginBottom: '-20px', // fix straight line
    lineHeight: '115px',
    letterSpacing: '3.2px',
    color: '#000000',
    textAlign: 'left',
    '@media (max-width:1302px)': {
      lineHeight: '80px',
    },
    '@media (max-width:960px)': {
      lineHeight: '60px',
      letterSpacing: 0,
    },
    '@media (max-width:600px)': {
      lineHeight: '80px',
      marginBottom: '20px',
    },
  },
  subline: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    // fontSize: '18px',
    letterSpacing: '1.7px',
    color: black,
    textAlign: 'left',
  },
  rightSection: {
    height: '720px',
    backgroundColor: grayPrimary,
  },
  footerSection: {
    height: '112px',
    display: 'flex',
    paddingBottom: '10px',
    alignItems: 'flex-end',

    // responsive
    [theme.breakpoints.up('sm')]: {
      paddingLeft: pdLeftSM,
    },
    [theme.breakpoints.up('md')]: {
      padding: pdLeftMD,
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: pdLeftLG,
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: pdLeftXL,
    },
  },
  footerSectionMatches: {
    padding: pdLeftSM,
  },
  leftSectionMatches: {
    padding: pdLeftSM,
  },
}));

export { useStyles as default };
