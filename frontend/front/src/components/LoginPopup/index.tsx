/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import LoginPage from 'src/pages/LoginPage';
import useStyles from './useStyles';

interface FormDialogProps {
  redirectLogin: any;
}

export default function FormDialog(props: FormDialogProps): JSX.Element {
  const classes = useStyles();
  const { redirectLogin } = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    redirectLogin();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography onClick={handleClickOpen} className={classes.spanText}>
        Đăng nhập
      </Typography>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogContent className={classes.field}>
          <div style={{ width: '1000px' }}>
            <LoginPage />
          </div>
        </DialogContent>
        {/* <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Subscribe
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
