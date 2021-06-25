/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Box,
  Grid,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { RootState } from 'src/store/store';
import { getUserProfile } from 'src/features/Profile/ProfileAction';
import { loginAction, getUrlSocialAction } from 'src/features/Login/LoginAction';

import iconFb from 'src/assets/images/iconFb_Login.png';
import iconGg from 'src/assets/images/iconfinder_Google_Loginin.png';
import { HOST } from 'src/apis';
import { ROUTE_HOME, ROUTE_LOGIN } from 'src/constants';
import './_loginpage.scss';
import useStyles from './useStyles';

type FieldStates = {
  email: string;
  password: string;
};

interface LoginProps {
  closePopup: any;
}

const LoginPage: React.FunctionComponent<LoginProps> = ({ closePopup }) => {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [field, setfield] = useState<FieldStates>({
    email: '',
    password: '',
  });
  const [popUp, setPopUp] = useState<boolean>(false);
  const loginStatus = useSelector((state: RootState) => state.login.loginResponse.status);
  const cmtPhotoId = useSelector((state: RootState) => state.login.isLoginToComment.paramId);
  const keyToRedirect = useSelector((state: RootState) => state.login.isLoginToComment.key);
  const featurePhoto = useSelector((state: RootState) => state.featurePhoto.featureListPhoto);
  // Prevent re-login when login successful
  useEffect(() => {
    if (loginStatus === 200) {
      history.push(`${ROUTE_HOME}`);
    }
    if (!(location.pathname === ROUTE_LOGIN)) {
      setPopUp(true);
    }
  }, [loginStatus, history, location]);

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
  };

  function handleError() {
    if (loginStatus === 400) {
      return <span className={classes.errorText}>Vui lòng nhập Email và mật khẩu</span>;
    }
    if (loginStatus === 401 || loginStatus === 500) {
      return <span className={classes.errorText}>Email hoặc mật khẩu không đúng</span>;
    }
    return null;
  }

  const handleClose = () => {
    closePopup(false);
  };

  function handleCloseLoginPopup() {
    if (!(location.pathname === ROUTE_LOGIN)) {
      return (
        <IconButton aria-label='close' style={{ position: 'absolute', right: 0 }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      );
    }
    return null;
  }

  const checkPathImg = (path) => {
    if (path?.includes(HOST)) {
      return path;
    }

    return `${HOST}${path}`;
  };

  // const loginInfo: {
  //   image: string;
  // } = {
  //   image: imgLogin,
  // }

  return (
    <Grid className={classes.root} container>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.leftLoginPage}>
        <img
          alt='login'
          className={classes.loginImage}
          src={
            popUp
              ? checkPathImg(featurePhoto[0]?.popup_photo.image_path)
              : checkPathImg(featurePhoto[0]?.login_photo.image_path)
          }
        />
      </Grid>
      {handleCloseLoginPopup()}
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        className={popUp ? classes.popupLogin : classes.rightLoginPage}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div className={classes.setWidthField}>
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '4px 0 4px 0',
            }}
          >
            <hr className={classes.line} />
            <span className={classes.title}>hoặc</span>
            <hr className={classes.line} />
          </div>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <div className={classes.fontManual}>Email</div>
            <TextField
              autoComplete='email'
              // autoFocus
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
            <Button className={classes.submit} fullWidth type='submit'>
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
              <span className={classes.fontManual} style={{ cursor: 'pointer' }}>
                {' '}
                Đăng ký ngay
              </span>
            </Link>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
