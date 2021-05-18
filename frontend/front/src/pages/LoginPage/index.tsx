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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import clsx from 'clsx';
import useStyles from './useStyles';
import './_loginpage.scss';
import { loginAction } from '../../features/Login/LoginAction';

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
    >
      <Grid item md={3} sm={12} xs={12} />
      <Grid item md={6} sm={12} xs={12}>
        <div className={classes.paper}>
          <Typography component='h1' variant='h5'>
            Log in your account!
          </Typography>
          <Grid item md={6} sm={8} xs={12}>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                autoComplete='username'
                autoFocus
                className={classes.field}
                fullWidth
                id='username'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Avatar className={classes.avatar}>
                        <AccountCircleOutlined />
                      </Avatar>
                    </InputAdornment>
                  ),
                }}
                margin='normal'
                name='username'
                onChange={(event) => handleChange(event)}
                placeholder='Your Account'
                required
                variant='outlined'
              />
              <TextField
                autoComplete='password'
                className={classes.field}
                fullWidth
                id='password'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                      </Avatar>
                    </InputAdornment>
                  ),
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
                placeholder='Password'
                required
                type={field.showPassword ? 'text' : 'password'}
                variant='outlined'
              />
              <FormControlLabel
                control={<Checkbox color='secondary' value='remember' />}
                label='Remember me'
              />
              <Button className={classes.submit} fullWidth type='submit'>
                Log In
              </Button>
              <Grid container>
                <Grid item md sm xs>
                  <Link className={classes.link} href='#'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item md sm xs>
                  <Link className={classes.link} href='#'>
                    Sign Up
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </div>
        <Box mt={8} />
      </Grid>
      <Grid item md={3} sm={12} xs={12} />
    </Grid>
  );
}

export default LoginPage;
