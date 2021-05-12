/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  paddingResponsive,
  black,
  grayPrimary,
  paddingLeft,
  paddingLeftResponsive,
} from '../../../../styles/theme';

const useStyles: () => Record<
  | 'root'
  | 'leftSection'
  | 'rightSection'
  | 'footerSection'
  | 'footerSectionMatches'
  | 'headline'
  | 'subline',
  string
> = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 'auto',
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingLeft,
    '@media (max-width:1302px)': {
      padding: paddingResponsive,
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
    paddingLeft,
    display: 'flex',
    paddingBottom: '10px',
    alignItems: 'flex-end',
    '@media (max-width:1302px)': {
      padding: paddingResponsive,
      paddingBottom: '20px',
    },
    '@media (max-width:1024px)': {
      paddingLeft: paddingLeftResponsive,
    },
  },
  footerSectionMatches: {
    // height: '112px',
    paddingLeft,
    display: 'flex',
    alignItems: 'flex-start',
    '@media (max-width:1302px)': {
      padding: paddingResponsive,
      paddingBottom: '20px',
    },
    '@media (max-width:1024px)': {
      paddingLeft: paddingLeftResponsive,
    },
  },
}));

export { useStyles as default };
