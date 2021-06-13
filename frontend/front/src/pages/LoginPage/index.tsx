/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
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
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { RootState } from 'src/store/store';
import { getUserProfile } from 'src/features/Profile/ProfileAction';
import { loginAction, getUrlSocialAction } from 'src/features/Login/LoginAction';

import iconFb from 'src/assets/images/iconFb_Login.png';
import iconGg from 'src/assets/images/iconfinder_Google_Loginin.png';

import './_loginpage.scss';
import useStyles from './useStyles';

type FieldStates = {
  email: string;
  password: string;
  showPassword: boolean;
};

function LoginPage(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [field, setfield] = useState<FieldStates>({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setfield({
      ...field,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    dispatch(loginAction(field)).then((status) => {
      if (status === 200) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  const handleClickShowPassword = () => {
    setfield({ ...field, showPassword: !field.showPassword });
  };

  const loginStatus = useSelector((state: RootState) => state.login.loginResponse.status);
  const cmtPhotoId = useSelector((state: RootState) => state.photo.isLoginToComment.photoId);

  useEffect(() => {
    if (loginStatus === 200) {
      const fetchProfile = async () => {
        await dispatch(getUserProfile());
        history.push('/');
      };
      fetchProfile();
    }
  });

  useEffect(() => {
    if (loginStatus === 200 && cmtPhotoId) {
      const fetchProfile = async () => {
        await dispatch(getUserProfile());
        history.replace(`/photo/${cmtPhotoId}`);
      };
      fetchProfile();
    }
  }, [dispatch, cmtPhotoId, loginStatus, history]);

  function handleError() {
    if (loginStatus === 400) {
      return <span className={classes.errorText}>Vui lòng nhập tài khoản/email và mật khẩu</span>;
    }
    if (loginStatus === 401 || loginStatus === 500) {
      return <span className={classes.errorText}>Tài khoản/Email hoặc mật khẩu không đúng</span>;
    }
    return null;
  }

  return (
    <Grid className={clsx(classes.root && 'login-page')} component='main' container item>
      <Grid className='imageBannerLogin' item md={6} sm={12} xs={12} />
      <Grid item md={6} sm={12} xs={12}>
        <div className={clsx(classes.paper && 'paper')}>
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword}>
                        {field.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                margin='normal'
                name='password'
                onChange={(event) => handleChange(event)}
                required
                type={field.showPassword ? 'text' : 'password'}
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

export default LoginPage;
