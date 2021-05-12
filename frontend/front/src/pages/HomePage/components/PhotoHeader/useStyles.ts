/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { makeStyles, Theme } from '@material-ui/core/styles';

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
    paddingLeft: '200px',
    '@media (max-width:1302px)': {
      padding: '0 20px',
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
    color: '#000000',
    textAlign: 'left',
  },
  rightSection: {
    height: '720px',
    backgroundColor: '#C4C4C4',
  },
  footerSection: {
    height: '112px',
    paddingLeft: '200px',
    display: 'flex',
    paddingBottom: '10px',
    alignItems: 'flex-end',
    '@media (max-width:1302px)': {
      padding: '0 20px',
      paddingBottom: '20px',
    },
    '@media (max-width:1024px)': {
      paddingLeft: '20px',
    },
  },
  footerSectionMatches: {
    // height: '112px',
    paddingLeft: '200px',
    display: 'flex',
    alignItems: 'flex-start',
    '@media (max-width:1302px)': {
      padding: '0 20px',
      paddingBottom: '20px',
    },
    '@media (max-width:1024px)': {
      paddingLeft: '20px',
    },
  },
}));

export { useStyles as default };
