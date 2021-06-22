import { green, red, blue, pink, orange } from '@material-ui/core/colors';
import {
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

const useStyles: () => Record<
  | 'root'
  | 'leftLoginPage'
  | 'loginImage'
  | 'header'
  | 'titleLogin'
  | 'savepassword'
  | 'button'
  | 'small'
  | 'socialButton'
  | 'title'
  | 'fontManual'
  | 'field'
  | 'link'
  | 'form'
  | 'submit'
  | 'errorText'
  | 'rightLoginPage'
  | 'line'
  | 'popupLogin'
  | 'setWidthField',
  string
> = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 'auto',
  },
  leftLoginPage: {
    height: 'fit-content',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  loginImage: {
    width: '100%',
  },
  header: {
    fontSize: '16px',
    color: '#2D3748',
    fontFamily: 'Roboto',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '10px',
    }
  },
  titleLogin: {
    fontSize: '30px',
    color: '#2D3748',
    paddingBottom: '33px',
    fontFamily: 'Roboto',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '10px',
    }
  },
  savepassword: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 10px',
    }
  },
  button: {
    width: '175px',
    height: '50px',
    backgroundColor: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      width: '155px',
    }
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  socialButton: {
    textTransform: 'none',
    fontFamily: 'Roboto',
    fontSize: '18px',
  },
  title: {
    paddingRight: '20px',
    paddingLeft: '20px',
    fontFamily: 'Roboto',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      padding: '0px 10px',
    }
  },
  fontManual: {
    fontFamily: 'Roboto',
    textAlign: 'left',
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
    width: '100%',
    height: '50px',
  },
  link: {
    color: '#2C5282',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#383838',
    color: 'white',
    '&:hover': {
      backgroundColor: 'gray',
    },
    '&.MuiButton-root': {
      padding: '15px 0px',
    },
  },
  errorText: {
    fontFamily: 'Roboto',
    color: '#FF0000',
  },
  rightLoginPage: {
    [theme.breakpoints.up('xs')]: {
      // background: green[500],
      // border: '10px solid #fafafa',
      paddingTop: '40px'
    },
    [theme.breakpoints.up('sm')]: {
      // background: pink[500],
      border: '10px solid #fafafa',
      paddingTop: '40px'
    },
    [theme.breakpoints.up('md')]: {
      // background: red[500],
      paddingTop: '40px'
    },
    [theme.breakpoints.up('lg')]: {
      // background: blue[500],
      paddingTop: '40px',
    },
    [theme.breakpoints.up('xl')]: {
      // background: orange[500],
      paddingTop: '80px',
    }
  },
  popupLogin: {
    paddingTop: '40px',
  },
  setWidthField: {
    [theme.breakpoints.up('xs')]: {
      width: '400px',
    },
    [theme.breakpoints.up('sm')]: {
      // width: '400px',
    },
    [theme.breakpoints.up('md')]: {
      // width: '400px',
    },
    [theme.breakpoints.up('lg')]: {
      // width: '400px',
    },
    [theme.breakpoints.up('xl')]: {
      // width: '400px',
    }
  },
  line: {
    height: '1px',
    width: '52px',
    // border- width: 0;
    // color: 'gray';
    // backgroundColor: 'gray';
    margin: '0px',
  }
  // root: {
  //   width: '100%',
  //   height: '90vh',
  //   display: 'flex',
  //   flexDirection: 'row',
  // },
  // paper: {
  //   margin: theme.spacing(8, 4),
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'left',
  //   width: '390px',
  // },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.secondary.main,
  // },
}));

export { useStyles as default };
