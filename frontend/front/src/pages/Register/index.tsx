/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikProps, Form } from 'formik';
import Link from 'react-router-dom/Link';
import * as Yup from 'yup';
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
import { getUrlSocialAction } from 'src/features/Login/LoginAction';
import { registerAction } from 'src/features/Register/RegisterAction';

import iconFb from 'src/assets/images/iconFb_Login.png';
import iconGg from 'src/assets/images/iconfinder_Google_Loginin.png';

import './_register.scss';
import useStyles from './useStyles';

interface FiledFormik {
  email: string,
  username: string,
  password: string,
  re_password: string,
}

function RegisterPage(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  type FieldStates = {
    showPassword: boolean;
    re_showPassword: boolean;
  };
  const [field, setfield] = useState<FieldStates>({
    showPassword: false,
    re_showPassword: false,
  });

  const initialValues: FiledFormik = {
    email: '',
    username: '',
    password: '',
    re_password: '',
  };

  const handleClickShowPassword = () => {
    setfield({ ...field, showPassword: !field.showPassword });
  };

  const handleClickre_ShowPassword = () => {
    setfield({ ...field, re_showPassword: !field.re_showPassword });
  };

  const registerStatus = useSelector((state: RootState) => state.register.registerResponse.status);

  useEffect(() => {
    if (registerStatus === 201) {
      history.push('/');
    }
  });

  return (
    <Grid className={clsx(classes.root && 'login-page')} component='main' container item>
      <Grid className='imageBannerLogin' item md={6} sm={12} xs={12} />
      <Grid item md={6} sm={12} xs={12}>
        <div className={clsx(classes.paper && 'paper')}>
          <Box textAlign='left'>
            <Typography component='span'>
              <Box className={classes.titleLogin} fontWeight='fontWeightBold'>
                Đăng ký
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
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                setLoading(true);
                // console.log('values after submit', values);
                dispatch(registerAction(values)).then(((status) => {
                  if (status === 201) {
                    setLoading(false);
                  }
                }));
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Email không hợp lệ'),
                  // .required('Vui lòng nhập Email'),
                username: Yup.string(),
                // .required('Vui lòng nhập họ tên'),
                password: Yup.string()
                  .matches(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{7,20}\S$/
                  ),
                  // .required(
                  //   'Please valid password. One uppercase, one lowercase, one special character and no spaces'
                  // ),
                re_password: Yup.string().when('password', {
                  is: (val) => (!!(val && val.length > 0)),
                  then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    'Mật khẩu không trùng khớp'
                  )
                })
                  // .required('Vui lòng xác nhận mật khẩu'),
              })}
            >
              {(props: FormikProps<FiledFormik>) => {
                const {
                  values,
                  touched,
                  errors,
                  handleBlur,
                  handleChange,
                  isSubmitting,
                } = props;
                return (
                  <Form className={classes.form}>
                    <div className={classes.fontManual}>Họ tên</div>
                    <TextField
                      autoComplete='username'
                      autoFocus
                      className={classes.field}
                      fullWidth
                      margin='normal'
                      required
                      variant='outlined'
                      name='username'
                      id='username'
                      value={values.username}
                      type='text'
                      helperText={
                        errors.username && touched.username
                          ? errors.username
                          : null
                      }
                      error={!!(errors.username && touched.username)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className={classes.fontManual} style={{ paddingTop: '16px' }}>
                      Email
                    </div>
                    <TextField
                      autoComplete='email'
                      // autoFocus
                      className={classes.field}
                      fullWidth
                      margin='normal'
                      required
                      variant='outlined'
                      id='email'
                      name='email'
                      type='email'
                      helperText={
                        errors.email && touched.email
                          ? errors.email
                          : null
                      }
                      error={!!(errors.email && touched.email)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className={classes.fontManual} style={{ paddingTop: '16px' }}>
                      Mật khẩu
                    </div>
                    <TextField
                      autoComplete='password'
                      className={classes.field}
                      fullWidth
                      id='password'
                      name='password'
                      value={values.password}
                      helperText={
                        errors.password && touched.password
                          ? 'Mật khẩu hợp lệ tối thiểu 8 kí tự gồm 1 chữ viết hoa, viết thường, số'
                          : null
                      }
                      error={!!(errors.password && touched.password)}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      required
                      type={field.showPassword ? 'text' : 'password'}
                      variant='outlined'
                    />
                    <div className={classes.fontManual} style={{ paddingTop: '40px' }}>
                      Nhập lại mật khẩu
                    </div>
                    <TextField
                      autoComplete='re_password'
                      className={classes.field}
                      fullWidth
                      id='re_password'
                      name='re_password'
                      value={values.re_password}
                      helperText={
                        errors.re_password && touched.re_password
                          ? errors.re_password
                          : null
                      }
                      error={!!(errors.re_password && touched.re_password)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton aria-label='toggle password visibility' onClick={handleClickre_ShowPassword}>
                              {field.re_showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      margin='normal'
                      required
                      type={field.re_showPassword ? 'text' : 'password'}
                      variant='outlined'
                    />
                    <div className={classes.savepassword}>
                      <div>
                        <FormControlLabel
                          control={<Checkbox color='secondary' value='remember' />}
                          label={<span style={{ fontFamily: 'Roboto', fontSize: '14' }}>Ghi nhớ mật khẩu</span>}
                        />
                      </div>
                    </div>
                    <Button
                      className={classes.submit}
                      fullWidth
                      type='submit'
                    // disabled={isSubmitting}
                    // onClick={() => {
                    //   console.log('show filled fields', values);
                    // }}
                    >
                      {loading ? (
                        <CircularProgress />
                      ) : (
                        <Typography component='h6' className={classes.socialButton}>
                          Đăng ký
                        </Typography>
                      )}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <Box textAlign='center'>
              <span className={classes.fontManual}>Đã có tài khoản?</span>
              <Link className={classes.link} to='/login'>
                <span className={classes.fontManual} style={{ cursor: 'pointer' }}> Đăng nhập</span>
              </Link>
            </Box>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

export default RegisterPage;
