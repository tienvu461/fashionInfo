/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useState, useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import LoginPopup from 'src/components/LoginPopup/components';
import useStyles from './useStyles';

interface FormDialogProps {
  redirectLogin: any;
}

const FormDialog: React.FunctionComponent<FormDialogProps> = (props) => {
  const classes = useStyles();
  const { redirectLogin } = props;

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
    redirectLogin();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const callback = useCallback((close) => {
    setOpen(close);
  }, []);

  return (
    <div>
      <Typography onClick={handleClickOpen} className={classes.spanText}>
        Đăng nhập
      </Typography>
      <Dialog maxWidth={false} open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogContent className={classes.field} style={{ paddingTop: '0px' }}>
          <div className='dialogContent'>
            <div className='dialog-container'>
              <LoginPopup closePopup={callback} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
