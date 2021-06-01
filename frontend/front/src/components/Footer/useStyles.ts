/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { white, pdXL, pdSM, pdLG, pdMD, theme, black } from 'src/styles/theme';

const useStyles: () => Record<
  | 'root'
  | 'leftFooter'
  | 'rightFooter'
  | 'field'
  | 'emailInput'
  | 'header'
  | 'links'
  | 'link'
  | 'headerRight'
  | 'listIcons'
  | 'icon'
  | 'logoFooter',
  string
> = makeStyles(() => ({
  root: {
    width: '100%',
    height: 'auto',
    marginTop: '12px',
    backgroundColor: '#0D0D0D',

    // responsive
    [theme.breakpoints.up('sm')]: {
      padding: pdSM,
    },
    [theme.breakpoints.up('md')]: {
      padding: pdMD,
    },
    [theme.breakpoints.up('lg')]: {
      padding: pdLG,
    },
    [theme.breakpoints.up('xl')]: {
      padding: pdXL,
    },
  },
  leftFooter: {
    padding: '151px 0 52px 0',
  },
  rightFooter: {
    padding: '176px 0 52px 0',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  header: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    lineHeight: '35px',
    letterSpacing: '1.2px',
    textAlign: 'left',
  },
  headerRight: {
    paddingBottom: '60px',
  },
  field: {
    borderBottom: '1px solid #5c5c5c',
    height: '67.17px',
    width: '300px',

    '& .MuiInputBase-input': {
      color: '#FFFFFF',
      paddingBottom: '16px',
      paddingTop: '6px',
      fontSize: '24px',
    },

    '& .MuiInputLabel-formControl': {
      color: '#FFFFFF',
      opacity: 0.5,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '15px',
      lineHeight: '20px',
    },
  },
  emailInput: {
    paddingTop: '56.91px',
  },
  logoFooter: {
    textAlign: 'left',
    paddingTop: '134.92px',
  },
  links: {
    paddingLeft: '84px',
  },
  link: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    lineHeight: '23px',
    letterSpacing: '-0.281584pxx',
    textAlign: 'left',
    paddingBottom: '21.22px',
  },
  listIcons: {},
  icon: {},
}));

export { useStyles as default };
