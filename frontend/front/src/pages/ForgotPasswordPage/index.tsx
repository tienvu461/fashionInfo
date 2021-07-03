/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPasswordAction } from 'src/features/ForgotPassword/ForgotPasswordAction';
import { RootState } from 'src/store/store';
import { Formik, FormikProps, Form } from 'formik';

import * as Yup from 'yup';
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
import useStyles from './useStyles';

interface FiledFormik {
  email: string,
}

function ForgotPassword(): JSX.Element {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const initialValues: FiledFormik = {
    email: '',
  };
  const featurePhoto = useSelector((state: RootState) => state.featurePhoto.featureListPhoto);
  const checkPathImg = (path) => {
    if (path?.includes(HOST)) {
      return path;
    }

    return `${HOST}${path}`;
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
              Quên mật khẩu
            </Box>
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: FiledFormik) => {
              setLoading(true);
              // console.log('values after submit', values);
              dispatch(forgotPasswordAction(values)).then((status) => {
                if (status === 204) {
                  setLoading(false);
                } else {
                  setLoading(false);
                }
              });
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Email không hợp lệ'),
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
                  <div className={classes.fontManual}>Email</div>
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
                    value={values.email}
                    helperText={
                      errors.email && touched.email
                        ? errors.email
                        : null
                    }
                    error={!!(errors.email && touched.email)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Button className={classes.submit} fullWidth type='submit'>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <Typography component='h6' className={classes.socialButton}>
                        Gửi Email khôi phục
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
export default ForgotPassword;
