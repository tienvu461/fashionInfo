/* eslint-disable import/no-unresolved */
import React from 'react';
import { Typography, Grid, TextField, IconButton, MenuList, MenuItem } from '@material-ui/core';
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
              <IconButton className={classes.buttonSocial}>
                <img alt='facebook' src={facebook} />
              </IconButton>
            </div>
            <div className={classes.icon}>
              <IconButton className={classes.buttonSocial}>
                <img alt='youtube' src={youtube} />
              </IconButton>
            </div>
            <div className={classes.icon}>
              <IconButton className={classes.buttonSocial}>
                <img alt='instagram' src={instagram} />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
