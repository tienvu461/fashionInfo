import {
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

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
| 'titleLogin'
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
    }
  },
  field: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'FAFAFA',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FAFAFA',
    },
    '& .MuiOutlinedInput-input': {
      color: 'FAFAFA',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: 'FAFAFA',
    },
    '& .MuiInputLabel-outlined': {
      color: 'FAFAFA',
    },
    '&:hover .MuiInputLabel-outlined': {
      color: '#FAFAFA',
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
    textTransform: 'none'
  },
  button: {
    width: '175px',
    height: '50px'
  },
  savepassword: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    fontSize: '16px',
    color: '#2D3748',
  },
  titleLogin: {
    fontSize: '30px',
    color: '#2D3748',
    paddingBottom: '33px',
  }
}));

export { useStyles as default };
