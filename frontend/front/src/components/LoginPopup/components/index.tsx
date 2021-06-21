/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'react-router-dom/Link';
import {
  Typography,
  Box,
  Grid,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ImagePopup from 'src/assets/images/login_popup.png';
import { RootState } from 'src/store/store';
import { getUserProfile } from 'src/features/Profile/ProfileAction';
import { loginAction, getUrlSocialAction } from 'src/features/Login/LoginAction';

import iconFb from 'src/assets/images/iconFb_Login.png';
import iconGg from 'src/assets/images/iconfinder_Google_Loginin.png';
import { ROUTE_HOME } from 'src/constants';

import './_loginpopup.scss';
import useStyles from './useStyles';

type FieldStates = {
  email: string;
  password: string;
};

function LoginPopup({ closePopup }): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [field, setfield] = useState<FieldStates>({
    email: '',
    password: '',
  });
  const [isEmpty, setEmpty] = useState<boolean>(false);
  const loginStatus = useSelector((state: RootState) => state.login.loginResponse.status);
  const cmtPhotoId = useSelector((state: RootState) => state.login.isLoginToComment.paramId);
  const keyToRedirect = useSelector((state: RootState) => state.login.isLoginToComment.key);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setfield({
      ...field,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (field.email === '' && field.password === '') {
      event.preventDefault();
      setEmpty(true);
    } else {
      event.preventDefault();
      setEmpty(false);
      setLoading(true);
      dispatch(loginAction(field)).then((status) => {
        if (status === 200) {
          setLoading(false);
          const fetchProfile = async () => {
            await dispatch(getUserProfile());
            if (cmtPhotoId) {
              history.replace(`/${keyToRedirect}/${cmtPhotoId}`);
            } else {
              history.push(`${ROUTE_HOME}`);
            }
          };
          fetchProfile();
        } else {
          setLoading(false);
        }
      });
    }
  };

  function handleError() {
    if (loginStatus === 400 || isEmpty) {
      return <span className={classes.errorText}>Vui lòng nhập tài khoản/email và mật khẩu</span>;
    }
    if (loginStatus === 401 || loginStatus === 500) {
      return <span className={classes.errorText}>Tài khoản/Email hoặc mật khẩu không đúng</span>;
    }
    return null;
  }

  const handleClose = () => {
    closePopup(false);
  };

  return (
    <Grid className={clsx(classes.root && 'login-page')} component='main' container item>
      {/* <Grid className='imageBannerLoginPopup' item md={6} sm={12} xs={12} /> */}
      <Grid item md={6} sm={12} xs={12} className='dialog-img'>
        <img alt='dialog-logo' src={ImagePopup} />
      </Grid>
      <Grid item md={6} sm={12} xs={12} style={{ position: 'relative' }} className='textField'>
        <IconButton aria-label='close' style={{ position: 'absolute', right: 0 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <div className={clsx(classes.paper && 'paperPopup')}>
          <Box textAlign='left'>
            <Typography component='span'>
              <Box className={classes.header}>Welcome back!</Box>
            </Typography>
            <Typography component='span'>
              <Box className={classes.titleLogin} fontWeight='fontWeightBold'>
                Đăng nhập
              </Box>
            </Typography>
            <div className={classes.savepassword}>
              <Button
                className={classes.button}
                onClick={() => {
                  dispatch(getUrlSocialAction());
                }}
                startIcon={<Avatar alt='goole-icon' className={classes.small} src={iconGg} />}
              >
                <Typography component='span'>
                  <Box className={classes.socialButton} color='#000000' fontSize={16} fontWeight='fontWeightBold'>
                    Qua Google
                  </Box>
                </Typography>
              </Button>
              <Button
                className={classes.button}
                startIcon={<Avatar alt='goole-icon' className={classes.small} src={iconFb} />}
              >
                <Typography component='span'>
                  <Box className={classes.socialButton} color='#000000' fontSize={16} fontWeight='fontWeightBold'>
                    Qua Facebook
                  </Box>
                </Typography>
              </Button>
            </div>
            {/* <div> */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '4px 0 4px 0',
              }}
            >
              <hr className='line' />
              <span className={classes.title}>hoặc</span>
              <hr className='line' />
            </div>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <div className={classes.fontManual}>Email</div>
              <TextField
                autoComplete='email'
                autoFocus
                className={classes.field}
                fullWidth
                id='email'
                margin='normal'
                name='email'
                onChange={(event) => handleChange(event)}
                required
                variant='outlined'
              />
              <div className={classes.fontManual} style={{ paddingTop: '16px' }}>
                Mật khẩu
              </div>
              <TextField
                autoComplete='password'
                className={classes.field}
                fullWidth
                id='password'
                margin='normal'
                name='password'
                onChange={(event) => handleChange(event)}
                required
                type='password'
                variant='outlined'
              />
              <Typography>{handleError()}</Typography>
              <div className={classes.savepassword}>
                <div>
                  <FormControlLabel
                    control={<Checkbox color='secondary' value='remember' />}
                    label={<span style={{ fontFamily: 'Roboto', fontSize: '14' }}>Ghi nhớ mật khẩu</span>}
                  />
                </div>
                <div>
                  <Link className={classes.link}>
                    <span className={classes.fontManual}>Quên mật khẩu?</span>
                  </Link>
                </div>
              </div>
              <Button
                className={classes.submit}
                fullWidth
                type='submit'
              >
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Typography component='h6' className={classes.socialButton}>
                    Đăng nhập
                  </Typography>
                )}
              </Button>
            </form>
            <Box textAlign='center'>
              <span className={classes.fontManual}>Chưa có tài khoản?</span>
              <Link className={classes.link} to='/register'>
                <span className={classes.fontManual} style={{ cursor: 'pointer' }}> Đăng ký ngay</span>
              </Link>
            </Box>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginPopup;