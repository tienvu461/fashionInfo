import {
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
/* eslint-disable object-curly-newline */
const useStyles: () => Record<
'root'
| 'field'
| 'flexLeft'
| 'flexRight'
| 'boxFlex'
| 'small'
| 'button'
| 'flexSocial'
| 'flexLink'
| 'headerLink'
| 'iconButton'
|'header', string> = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: '0px 100px 0px 100px',
    backgroundColor: '#0D0D0D',
    height: '550px',
  },
  flexLeft: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
    textAlign: 'left',
  },
  flexRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
    textAlign: 'right',
  },
  boxFlex: {
    width: '380px',
    height: '194px',
  },
  header: {
    fontSize: '30px',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
  },
  headerLink: {
    fontSize: '20px',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
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
      margin: theme.spacing(1),
    },
    width: '380.65px',
    height: '67.17px',
    color: '#FFFFFF',
    paddingTop: '16px'
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
      height: '50%'
    },
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
  iconButton: {
    padding: '0px 20px 0px 0px',
  }
}));

export { useStyles as default };
