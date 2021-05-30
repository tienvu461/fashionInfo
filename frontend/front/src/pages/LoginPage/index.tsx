/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import './_loginpage.scss';
import { RootState } from 'src/store/store';
import {
  loginAction,
  getUrlSocialAction,
} from '../../features/Login/LoginAction';
import iconGg from '../../assets/images/iconfinder_Google_Loginin.png';
import iconFb from '../../assets/images/iconFb_Login.png';
import useStyles from './useStyles';

type FieldStates = {
  username: string;
  password: string;
  showPassword: boolean;
};

function LoginPage(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [field, setfield] = useState<FieldStates>({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setfield({
      ...field,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginAction(field));
  };

  const handleClickShowPassword = () => {
    setfield({ ...field, showPassword: !field.showPassword });
  };

  const loginStatus = useSelector(
    (state: any) => state.login.loginResponse.status
  );
  const cmtPhotoId = useSelector((state: RootState) => state.photo.photoComment.photoId);

  useEffect(() => {
    if (loginStatus === 200) {
      history.push('/');
    }
  });

  useEffect(() => {
    if (loginStatus === 200 && cmtPhotoId) {
      history.replace(`/photo/${cmtPhotoId}`);
    }
  }, [cmtPhotoId, loginStatus, history]);

  function handleError() {
    if (loginStatus === 400) {
      return (
        <span className={classes.errorText}>
          Vui lòng nhập tài khoản/email và mật khẩu
        </span>
      );
    }
    if (loginStatus === 401) {
      return (
        <span className={classes.errorText}>
          Tài khoản/Email hoặc mật khẩu không đúng
        </span>
      );
    }
    return null;
  }

  return (
    <Grid
      className={clsx(classes.root && 'login-page')}
      component='main'
      container
      item
    >
      <Grid className='imageBannerLogin' item md={6} sm={12} xs={12} />
      <Grid item md={6} sm={12} xs={12}>
        <div className={classes.paper}>
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
                startIcon={
                  <Avatar
                    alt='goole-icon'
                    className={classes.small}
                    src={iconGg}
                  />
                }
              >
                <Typography component='span'>
                  <Box
                    className={classes.socialButton}
                    color='#000000'
                    fontSize={16}
                    fontWeight='fontWeightBold'
                  >
                    Qua Google
                  </Box>
                </Typography>
              </Button>
              <Button
                className={classes.button}
                startIcon={
                  <Avatar
                    alt='goole-icon'
                    className={classes.small}
                    src={iconFb}
                  />
                }
              >
                <Typography component='span'>
                  <Box
                    className={classes.socialButton}
                    color='#000000'
                    fontSize={16}
                    fontWeight='fontWeightBold'
                  >
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
                autoComplete='username'
                autoFocus
                className={classes.field}
                fullWidth
                id='username'
                margin='normal'
                name='username'
                onChange={(event) => handleChange(event)}
                required
                variant='outlined'
              />
              <div
                className={classes.fontManual}
                style={{ paddingTop: '16px' }}
              >
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
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                      >
                        {field.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
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
                    label={
                      <span style={{ fontFamily: 'Roboto', fontSize: '14' }}>
                        Ghi nhớ mật khẩu
                      </span>
                    }
                  />
                </div>
                <div>
                  <Link className={classes.link}>
                    <span className={classes.fontManual}>Quên mật khẩu?</span>
                  </Link>
                </div>
              </div>
              <Button className={classes.submit} fullWidth type='submit'>
                <Typography component='h6' className={classes.socialButton}>
                  Đăng nhập
                </Typography>
              </Button>
            </form>
            <Box textAlign='center'>
              <span className={classes.fontManual}>Chưa có tài khoản?</span>
              <Link className={classes.link}>
                <span className={classes.fontManual}> Đăng ký ngay</span>
              </Link>
            </Box>
            {/* </div> */}
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
