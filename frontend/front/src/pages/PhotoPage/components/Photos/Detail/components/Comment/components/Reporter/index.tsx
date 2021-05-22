/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Grid, Typography, Avatar } from '@material-ui/core';
import ReporterAvatar from 'src/assets/images/photos/reporter1.jpg';
import useStyles from './useStyles';

function Reporter(): JSX.Element {
    const classes = useStyles();

    return (
      <Grid className={classes.root} item lg={12} md={12} sm={12} xl={12} xs={12}>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <Typography className={classes.titleReporter} component='h4' variant='h4'>
            Reporter
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <div className={classes.reporterInfo}>
            <Avatar className={classes.avatar}>ks.</Avatar>
            <Typography className={classes.name} component='h6' variant='h6'>
              Dang Vinh Quang
            </Typography>
          </div>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xl={12} xs={12}>
          <Typography className={classes.paragraph} component='h6' variant='h6'>
            Hello. It's an understanding that you want to shoot different styles. Thank you very much.
          </Typography>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <img alt='reporter' className={classes.reporterImg} src={ReporterAvatar} />
        </Grid>
      </Grid>
    );
}

export default Reporter;
