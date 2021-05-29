/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Typography,
  Grid,
  TextField,
  Avatar,
  Button,
  IconButton,
} from '@material-ui/core';
import './_footer.scss';
import iconFT from 'src/assets/images/Logo_footer1.png';
import iconSocial from 'src/assets/images/social_logo.png';
import iconFaceBook from 'src/assets/images/iconFbFooter.svg';
import iconYoutobe from 'src/assets/images/iconYoutoteFooter.svg';
import iconIns from 'src/assets/images/iconInsFooter.svg';
import useStyles from './useStyles';

function Footer(): JSX.Element {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      component='main'
      container
      item
    >
      <Grid item xs={6} md={6} sm={6} className={classes.flexLeft}>
        <div className={classes.boxFlex}>
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
      <Grid item xs={6} md={6} sm={6} className={classes.flexRight}>
        <div className={classes.boxFlex}>
          <Typography className={classes.header} style={{ color: '#0D0D0D' }}>XXXXXX</Typography>
          <div className={classes.flexLink}>
            <Typography className={classes.header}>Truy cập </Typography>
            <Typography className={classes.header}>Helps</Typography>
          </div>
          <div className={classes.flexLink} style={{ paddingTop: '16px', marginTop: '16px' }}>
            <Typography className={classes.headerLink}>Tin tức mới </Typography>
            <Typography className={classes.headerLink}>FAQs</Typography>
          </div>
          <div className={classes.flexLink}>
            <Typography className={classes.headerLink}>Diễn đàn</Typography>
            <Typography className={classes.headerLink}>Liên hệ</Typography>
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
            />
          </div>
        </Grid>
        <Grid item xs={6} md={6} sm={6} style={{ textAlign: 'right' }} className={classes.flexSocial}>
          <div style={{ width: '380px', height: '33px' }}>
            <IconButton className={classes.iconButton}>
              <img src={iconFaceBook} alt='facebook' />
            </IconButton>
            <IconButton className={classes.iconButton}>
              <img src={iconYoutobe} alt='youtobe' />
            </IconButton>
            <IconButton className={classes.iconButton}>
              <img src={iconIns} alt='instagram' />
            </IconButton>
            {/* </div> */}
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
