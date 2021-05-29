import {
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
/* eslint-disable object-curly-newline */
const useStyles: () => Record<
'root'
| 'paper'
| 'avatar'
| 'form'
| 'field'
| 'link'
| 'small'
| 'socialButton'
| 'button'
| 'savepassword'
| 'header'
| 'fontManual'
| 'titleLogin'
| 'title'
| 'errorText'
| 'submit', string> = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '90vh',
    display: 'flex',
    flexDirection: 'row',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    width: '390px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#383838',
    color: 'white',
    '&:hover': {
      backgroundColor: 'gray',
    },
  },
  field: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#E8E8E8',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#000000',
    },
    '& .MuiOutlinedInput-input': {
      color: '#000000',
      fontFamily: 'Roboto',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: '#000000',
    },
    '& .MuiInputLabel-outlined': {
      color: '#000000',
    },
    '&:hover .MuiInputLabel-outlined': {
      color: '#000000',
    },

    // TextField select
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    width: '390px',
    height: '50px'
  },
  link: {
    color: '#2C5282',
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  socialButton: {
    textTransform: 'none',
    fontFamily: 'Roboto',
  },
  button: {
    width: '175px',
    height: '50px',
    backgroundColor: '#FFFFFF',
  },
  savepassword: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    fontSize: '16px',
    color: '#2D3748',
    fontFamily: 'Roboto',
  },
  titleLogin: {
    fontSize: '30px',
    color: '#2D3748',
    paddingBottom: '33px',
    fontFamily: 'Roboto',
  },
  fontManual: {
    fontFamily: 'Roboto',
  },
  title: {
    paddingRight: '20px',
    paddingLeft: '20px',
    fontFamily: 'Roboto',
  },
  errorText: {
    fontFamily: 'Roboto',
    color: '#FF0000'
  },
}));

export { useStyles as default };
