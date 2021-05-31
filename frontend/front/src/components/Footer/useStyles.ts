/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { white, pdXL, pdSM, pdLG, pdMD, theme, black } from 'src/styles/theme';

const useStyles: () => Record<
  | 'root'
  | 'box'
  | 'field'
  | 'lucete'
  | 'small'
  | 'socialButton'
  | 'button'
  | 'headerline'
  | 'boxLeft'
  | 'flex'
  | 'buttonSocial'
  | 'smallSocial'
  | 'flexSocial'
  | 'flexLink'
  | 'header',
  string
> = makeStyles(() => ({
  root: {
    width: '100%',
    height: 'auto',
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
  header: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    lineHeight: '35px',
    letterSpacing: '1.2px',
    textAlign: 'left'
  },
  headerline: {
    fontSize: '20px',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
  },
  box: {
    height: '347px',
    width: '380.65px',
    marginTop: '151px',
    marginLeft: '150px',
  },
  boxLeft: {
    height: '313px',
    width: '350px',
    marginTop: '151px',
    marginLeft: '150px',
  },
  field: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#E8E8E8',
    },
    // '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    //   borderColor: '#000000',
    // },
    '& .MuiOutlinedInput-input': {
      color: '#FFFFFF',
      // fontFamily: 'Roboto',
    },
    // '&:hover .MuiOutlinedInput-input': {
    //   color: '#000000',
    // },
    // '& .MuiInputLabel-outlined': {
    //   color: '#FFFFFF',
    // },
    // '&:hover .MuiInputLabel-outlined': {
    //   color: '#000000',
    // },

    // TextField select
    '& .MuiTextField-root': {
      // margin: theme.spacing(1),
    },
    width: '380.65px',
    height: '67.17px',
    color: '#FFFFFF',
    paddingTop: '56.91px',
  },
  lucete: {
    paddingTop: '16px',
  },
  button: {
    width: '106px',
    height: '18px',
  },
  small: {
    width: '106px',
    height: '18px',
    backgroundRepeat: 'no-repeat',
    '& .MuiAvatar-img': {
      width: '50%',
      height: '50%',
    },
  },
  buttonSocial: {
    width: '177px',
    height: '33px',
  },
  smallSocial: {
    width: '177px',
    height: '33px',
    backgroundRepeat: 'no-repeat',
    '& .MuiAvatar-img': {
      width: '50%',
      height: '50%',
    },
  },
  socialButton: {
    textTransform: 'none',
    fontFamily: 'Roboto',
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexSocial: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
  },
  flexLink: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));

export { useStyles as default };
