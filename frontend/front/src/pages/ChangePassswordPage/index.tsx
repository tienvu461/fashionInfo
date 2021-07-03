/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { confirmPasswordAction } from 'src/features/ForgotPassword/ForgotPasswordAction';
import { RootState } from 'src/store/store';
import {
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { HOST } from 'src/apis';
// import imgLogin from 'src/assets/images/Mask_Group_Login.png';
import { Formik, FormikProps, Form } from 'formik';

import * as Yup from 'yup';
import useStyles from './useStyles';

interface FiledFormik {
  uid: string,
  token: string,
  new_password: string,
  re_new_password: string,
}

function ChangePassword(): JSX.Element {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const history = useHistory();
  const featurePhoto = useSelector((state: RootState) => state.featurePhoto.featureListPhoto);
  const location = useLocation();
  const url = location.pathname;
  const keyGetUrl: string[] = url.split('/').map((item) => item);

  const initialValues: FiledFormik = {
    uid: keyGetUrl[3],
    token: keyGetUrl[4],
    new_password: '',
    re_new_password: '',
  };

  const checkPathImg = (path) => {
    if (path?.includes(HOST)) {
      return path;
    }

    return `${HOST}${path}`;
  };

  const changePassword = (data: FiledFormik) => {
    dispatch(confirmPasswordAction(data)).then((status) => {
      if (status === 204) {
        setLoading(false);
        history.push('/');
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <Grid className={classes.root} container>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={classes.leftLoginPage}>
        <LazyLoadImage
          alt='login'
          className={classes.loginImage}
          src={checkPathImg(featurePhoto[0]?.login_photo.image_path)}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        className={classes.rightLoginPage}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div className={classes.setWidthField}>
          <Typography component='span'>
            <Box className={classes.titleLogin} fontWeight='fontWeightBold'>
              Đổi mật khẩu
            </Box>
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: FiledFormik) => {
              setLoading(true);
              // console.log('values after submit', values);
              changePassword(values);
            }}
            validationSchema={Yup.object().shape({
              new_password: Yup.string()
                .matches(
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{7,20}\S$/
                ),
              re_new_password: Yup.string().when('new_password', {
                is: (val) => (!!(val && val.length > 0)),
                then: Yup.string().oneOf(
                  [Yup.ref('new_password')],
                  'Mật khẩu không trùng khớp'
                )
              })
            })}
          >
            {(props: FormikProps<FiledFormik>) => {
              const {
                values,
                touched,
                errors,
                handleBlur,
                handleChange,
                // isSubmitting,
              } = props;
              return (
                <Form className={classes.form}>
                  <div className={classes.fontManual}>Mật khẩu mới</div>
                  <TextField
                    autoComplete='new_password'
                    // autoFocus
                    className={classes.field}
                    fullWidth
                    id='new_password'
                    margin='normal'
                    name='new_password'
                    value={values.new_password}
                    helperText={
                      errors.new_password && touched.new_password
                        ? 'Mật khẩu hợp lệ tối thiểu 8 kí tự gồm 1 chữ viết hoa, viết thường, số'
                        : null
                    }
                    error={!!(errors.new_password && touched.new_password)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    variant='outlined'
                  />
                  <div className={classes.fontManual} style={{ paddingTop: '35px' }}>Xác nhận lại mật khẩu</div>
                  <TextField
                    autoComplete='re_new_password'
                    // autoFocus
                    className={classes.field}
                    fullWidth
                    id='re_new_password'
                    margin='normal'
                    name='re_new_password'
                    value={values.re_new_password}
                    helperText={
                      errors.re_new_password && touched.re_new_password
                        ? errors.re_new_password
                        : null
                    }
                    error={!!(errors.re_new_password && touched.re_new_password)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    type='password'
                    variant='outlined'
                  />
                  <Button
                    className={classes.submit}
                    fullWidth
                    type='submit'
                  >
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <Typography component='h6' className={classes.socialButton}>
                        Thay đổi mật khẩu
                      </Typography>
                    )}
                  </Button>
                </Form>
              );
            }}
          </Formik>
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
}
export default ChangePassword;
