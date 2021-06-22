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
  CircularProgress,
} from '@material-ui/core';

import { RootState } from 'src/store/store';
import { getUrlSocialAction } from 'src/features/Login/LoginAction';
import { registerAction } from 'src/features/Register/RegisterAction';

import iconFb from 'src/assets/images/iconFb_Login.png';
import iconGg from 'src/assets/images/iconfinder_Google_Loginin.png';

// import './_register.scss';
import useStyles from './useStyles';

interface FiledFormik {
  email: string,
  username: string,
  first_name: string,
  last_name: string,
  password: string,
  re_password: string,
}

function RegisterPage(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: FiledFormik = {
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    re_password: '',
  };

  const registerStatus = useSelector((state: RootState) => state.register.registerResponse.status);

  useEffect(() => {
    if (registerStatus === 201) {
      history.push('/login');
    }
  });

  const createNewUser = (data: FiledFormik) => {
    const value_username = data.email.split('@')[0];
    data.username = value_username;
    dispatch(registerAction(data)).then(((status) => {
      if (status === 201) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    }));
  };

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
                createNewUser(values);
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Email không hợp lệ'),
                // .required('Vui lòng nhập Email'),
                // username: Yup.string(),
                // .required('Vui lòng nhập họ tên'),
                first_name: Yup.string(),
                last_name: Yup.string(),
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
                    <div style={{ display: 'flex' }}>
                      <div>
                        <div className={classes.fontManual}>Họ</div>
                        <TextField
                          style={{ width: '100px' }}
                          autoComplete='first_name'
                          autoFocus
                          className={classes.field}
                          fullWidth
                          margin='normal'
                          required
                          variant='outlined'
                          name='first_name'
                          id='first_name'
                          value={values.first_name}
                          type='text'
                          helperText={
                            errors.first_name && touched.first_name
                              ? errors.first_name
                              : null
                          }
                          error={!!(errors.first_name && touched.first_name)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div>
                        <div className={classes.fontManual} style={{ paddingLeft: '10px' }}>Tên</div>
                        <TextField
                          style={{ width: '290px', paddingLeft: '10px' }}
                          autoComplete='last_name'
                          autoFocus
                          className={classes.field}
                          fullWidth
                          margin='normal'
                          required
                          variant='outlined'
                          name='last_name'
                          id='last_name'
                          value={values.last_name}
                          type='text'
                          helperText={
                            errors.last_name && touched.last_name
                              ? errors.last_name
                              : null
                          }
                          error={!!(errors.last_name && touched.last_name)}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
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
                      margin='normal'
                      required
                      type='password'
                      variant='outlined'
                    />
                    <div className={classes.fontManual} style={{ paddingTop: '16px' }}>
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
                      margin='normal'
                      required
                      type='password'
                      variant='outlined'
                    />
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
