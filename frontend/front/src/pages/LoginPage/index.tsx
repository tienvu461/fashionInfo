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
  Divider,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import useStyles from './useStyles';
import './_loginpage.scss';
import { loginAction } from '../../features/Login/LoginAction';
import iconGg from '../../assets/images/iconfinder_Google_Loginin.png';
import iconFb from '../../assets/images/iconFb_Login.png';

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

  return (
    <Grid
      className={clsx(classes.root && 'login-page')}
      component='main'
      container
      item
    >
      <Grid item md={6} sm={12} xs={12} className='imageBannerLogin'></Grid>
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
            <Button
              startIcon={
                <Avatar
                  alt='goole-icon'
                  src={iconGg}
                  className={classes.small}
                />
              }
              className={classes.button}
            >
              <Typography component='span'>
                <Box
                  fontWeight='fontWeightBold'
                  fontSize={16}
                  color='#000000'
                  className={classes.socialButton}
                >
                  Qua Google
                </Box>
              </Typography>
            </Button>
            <Button
              startIcon={
                <Avatar
                  alt='goole-icon'
                  src={iconFb}
                  className={classes.small}
                />
              }
              className={classes.button}
            >
              <Typography component='span'>
                <Box
                  fontWeight='fontWeightBold'
                  fontSize={16}
                  color='#000000'
                  className={classes.socialButton}
                >
                  Qua Facebook
                </Box>
              </Typography>
            </Button>
            {/* <div> */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '4px 0 4px 0',
              }}
            >
              <hr className='line'></hr>
              <span className={classes.title}>hoặc</span>
              <hr className='line'></hr>
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
                style={{ paddingTop: '16px' }}
                className={classes.fontManual}
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
              <div className={classes.savepassword}>
                <div>
                  <FormControlLabel
                    control={<Checkbox value='remember' color='secondary' />}
                    label={
                      <span style={{ fontFamily: 'Roboto' }}>
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
                <Typography component='span'>
                  <Box
                    fontWeight='fontWeightBold'
                    fontSize={16}
                    color='#ffffff'
                    className={classes.socialButton}
                  >
                    Đăng nhập
                  </Box>
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
