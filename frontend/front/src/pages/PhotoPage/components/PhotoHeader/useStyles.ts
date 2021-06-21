/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { textColor, pdLeftXL, pdLeftLG, pdLeftSM, theme } from 'src/styles/theme';

const useStyles: () => Record<
  'root' | 'leftSection' | 'leftSectionMatches' | 'rightSection' | 'imgBanner' | 'headline' | 'subline',
  string
> = makeStyles(() => ({
  root: {
    width: '100%',
    height: 'auto',
    '@media (min-width:960px)': {
      height: '453px',
    },
    '@media (min-width:1600px)': {
      height: '755px',
    },
    '@media (max-width:960px)': {
      height: '755px',
    },
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',

    // responsive
    [theme.breakpoints.up('sm')]: {
      paddingLeft: pdLeftSM,
    },
    [theme.breakpoints.up('md')]: {
      // padding: pdLeftMD,
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: pdLeftLG,
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: pdLeftXL,
    },
    '@media (min-width:960px)': {
      height: '453px',
    },
    '@media (min-width:1600px)': {
      height: '755px',
    },
    '@media (max-width:960px)': {
      height: '755px',
    },
  },
  headline: {
    fontStyle: 'normal',
    fontWeight: 900,
    // marginBottom: '-20px', // fix straight line
    lineHeight: '115px',
    // letterSpacing: '3.2px',
    color: '#000000',
    textAlign: 'left',
    '@media (max-width:1302px)': {
      lineHeight: '96px',
    },
    '@media (max-width:960px)': {
      lineHeight: '60px',
      letterSpacing: 0,
    },
    '@media (max-width:600px)': {
      lineHeight: '96px',
      marginBottom: '20px',
    },
  },
  subline: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: '1.7px',
    color: textColor,
    textAlign: 'left',
  },
  rightSection: {
    '@media (min-width:960px)': {
      height: '453px',
    },
    '@media (min-width:1600px)': {
      height: '755px',
    },
    '@media (max-width:960px)': {
      height: '755px',
    },
  },
  imgBanner: {
    width: '100%',
  },
  leftSectionMatches: {
    padding: pdLeftSM,
  },
}));

export { useStyles as default };
