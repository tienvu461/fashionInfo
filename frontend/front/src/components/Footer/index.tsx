import React from 'react';
import {
  Typography,
  Box,
  Grid,
  TextField,
  Avatar,
  Button,
  CardMedia
} from '@material-ui/core';
import clsx from 'clsx';
import './_footer.scss';
import iconFT from '../../assets/images/Logo_footer1.png';
import iconSocial from '../../assets/images/social_logo.png';
import useStyles from './useStyles';

function Footer(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid
      // className={clsx(classes.root && 'footer')}
      component='main'
      container
      style={{ backgroundColor: '#0D0D0D', height: '550px' }}
      item
    >
      <Grid item xs={6} md={6} sm={6} style={{ height: '500px', textAlign: 'left' }} className={classes.flex}>
        <div style={{ width: '380px', height: '194px' }}>
          <Typography className={classes.header}>Theo dõi tin tức </Typography>
          <Typography className={classes.header}>mới nhất từ chúng tôi</Typography>
          <TextField
            autoComplete='email'
            autoFocus
            className={classes.field}
            fullWidth
            id='email'
            margin='normal'
            name='email'
            required
            placeholder='Địa chỉ email'
            variant='outlined'
          />
        </div>
      </Grid>
      <Grid item xs={6} md={6} sm={6} style={{ height: '500px', textAlign: 'right' }} className={classes.flex}>
        <div style={{ width: '380px', height: '194px' }}>
          <Typography className={classes.header} style={{ color: '#0D0D0D' }}>XXXXXX</Typography>
          <div className={classes.flexLink}>
            <Typography className={classes.header}>Truy cập </Typography>
            <Typography className={classes.header}>Helps</Typography>
          </div>
          <div className={classes.flexLink} style={{ paddingTop: "16px", marginTop: "16px" }}>
            <Typography className={classes.header} style={{ fontSize: "20px" }}>Tin tức mới </Typography>
            <Typography className={classes.header} style={{ fontSize: "20px" }}>FAQs</Typography>
          </div>
          <div className={classes.flexLink}>
            <Typography className={classes.header} style={{ fontSize: "20px" }}>Diễn đàn</Typography>
            <Typography className={classes.header} style={{ fontSize: "20px" }}>Liên hệ</Typography>
          </div>
        </div>
      </Grid>
      <Grid container item xs={12} md={12} sm={12} style={{ height: '50px' }}>
        <Grid item xs={6} md={6} sm={6} style={{ textAlign: 'left' }} className={classes.flexSocial}>
          <div style={{ width: '380px' }}>
            <Button
              startIcon={
                <Avatar
                  alt='goole-icon'
                  src={iconFT}
                  className={classes.small}
                />
              }
              className={classes.button}
            >
            </Button>
          </div>
        </Grid>
        <Grid item xs={6} md={6} sm={6} style={{ textAlign: 'right' }} className={classes.flexSocial}>
          <div style={{ width: '380px', height: '33px' }}>
            <Button
              startIcon={
                <Avatar
                  alt='goole-icon'
                  src={iconSocial}
                  className={classes.smallSocial}
                />
              }
              className={classes.buttonSocial}
              >
            </Button>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
