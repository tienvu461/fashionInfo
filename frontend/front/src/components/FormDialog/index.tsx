/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useState, useCallback } from 'react';
import { Dialog, DialogContent, Typography, useMediaQuery } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LoginPage from 'src/pages/LoginPage';

import useStyles from './useStyles';

interface FormDialogProps {
  redirectLogin: any;
}

const FormDialog: React.FunctionComponent<FormDialogProps> = (props) => {
  const classes = useStyles();
  const { redirectLogin } = props;
  const history = useHistory();
  const matches = useMediaQuery('(max-width:1080px)');
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    redirectLogin();
    if (matches) {
      history.push('/login');
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const callback = useCallback((close) => {
    setOpen(close);
  }, []);

  return (
    <>
      <Typography component='span' onClick={handleClickOpen} className={classes.spanText}>
        Đăng nhập
      </Typography>
      <Dialog maxWidth={false} open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogContent className={classes.field} style={{ paddingTop: '0px' }}>
          <div className='dialogContent'>
            <div className='dialog-container'>
              <LoginPage closePopup={callback} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormDialog;
