/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Typography,
  Box,
  Grid,
  TextField,
  Avatar,
  Button,
  CardMedia,
  MenuList,
  MenuItem
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './_footer.scss';
import submitBtn from 'src/assets/images/submit_email_footer.svg';
import logoFooter from 'src/assets/images/Logo_footer1.png';
import youtube from 'src/assets/images/youtube.svg';
import instagram from 'src/assets/images/instagram.svg';
import facebook from 'src/assets/images/facebook.svg';
import useStyles from './useStyles';

function Footer(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid className={classes.leftFooter} item lg={6} md={6} sm={6} xs={6}>
          <Typography variant='h4' component='h4' className={classes.header}>
            Theo dõi tin tức{' '}
          </Typography>
          <Typography variant='h4' component='h4' className={classes.header}>
            mới nhất từ chúng tôi{' '}
          </Typography>
          <Grid container alignItems='center' className={classes.emailInput}>
            <Grid item>
              <TextField
                autoComplete='email'
                autoFocus
                className={classes.field}
                fullWidth
                id='email'
                name='email'
                required
                label='Địa chỉ email'
              />
            </Grid>
            <img alt='submit-footer' src={submitBtn} />
          </Grid>
          <Grid className={classes.logoFooter}>
            <img alt='logo-footer' src={logoFooter} />
          </Grid>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.rightFooter}>
          <Grid>
            {/* <Grid>
              <Typography variant='h4' component='h4' className={`${classes.header} ${classes.headerRight}`}>
                Truy cập
              </Typography>
              <Typography variant='h5' component='h5' className={classes.link}>
                Tin tức mới
              </Typography>
              <Typography variant='h5' component='h5' className={classes.link}>
                Diễn đàn
              </Typography>
            </Grid>
            <Grid className={classes.links}>
              <Typography variant='h4' component='h4' className={`${classes.header} ${classes.headerRight}`}>
                Helps
              </Typography>
              <Typography variant='h5' component='h5' className={classes.link}>
                FAQs
              </Typography>
              <Typography variant='h5' component='h5' className={classes.link}>
                Liên hệ
              </Typography>
            </Grid> */}
            <MenuList>
              <MenuItem>
                <Typography variant='h4' component='h4' className={classes.header}>
                  Truy cập
                </Typography>
                <Typography variant='h4' component='h4' className={classes.header}>
                  Helps
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography variant='h4' component='h4' className={classes.header}>
                  Tin tức mới
                </Typography>
                <Typography variant='h4' component='h4' className={classes.header}>
                  FAQ
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography variant='h4' component='h4' className={classes.header} noWrap>
                  Diễn đàn
                </Typography>
                <Typography variant='h4' component='h4' className={classes.header} noWrap>
                  Liên hệ
                </Typography>
              </MenuItem>
            </MenuList>
          </Grid>
          <Grid className={classes.listIcons}>
            <div className={classes.icon}>
              <img alt='facebook' src={facebook} />
            </div>
            <div className={classes.icon}>
              <img alt='youtube' src={youtube} />
            </div>
            <div className={classes.icon}>
              <img alt='instagram' src={instagram} />
            </div>
          </Grid>
        </Grid>
        {/* <Grid item xs={6} md={6} sm={6} style={{ height: '500px', textAlign: 'left' }} className={classes.flex}>
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
            />
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
            />
          </div>
        </Grid>
      </Grid> */}
      </Grid>
    </div>
  );
}

export default Footer;
