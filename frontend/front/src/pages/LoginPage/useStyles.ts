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
    alignItems: 'center',
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
    backgroundColor: 'black',
    color: 'white'
  },
  field: {
  }
}));

export { useStyles as default };
