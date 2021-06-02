/* eslint-disable import/no-unresolved */
import React from 'react';
import { Typography, Grid, TextField, IconButton, MenuList, MenuItem, useMediaQuery } from '@material-ui/core';
import submitBtn from 'src/assets/images/submit_email_footer.svg';
import logoFooter from 'src/assets/images/Logo_footer1.png';
import youtube from 'src/assets/images/youtube.svg';
import instagram from 'src/assets/images/instagram.svg';
import facebook from 'src/assets/images/facebook.svg';
import useStyles from './useStyles';
import './_footer.scss';

function Footer(): JSX.Element {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:600px)');

  const menu: Array<{
    id: string;
    title: string;
    firstSubTitle: string;
    secondSubTitle: string;
  }> = [
    {
      id: 'leftMenu',
      title: 'Truy cập',
      firstSubTitle: 'Tin tức mới',
      secondSubTitle: 'FAQ',
    },
    {
      id: 'rightMenu',
      title: 'Helps',
      firstSubTitle: 'Diễn đàn',
      secondSubTitle: 'Liên hệ',
    },
  ];

  const iconList: Array<{
    name: string;
    src: string;
  }> = [
    {
      name: 'facebook',
      src: facebook
    },
    {
      name: 'youtube',
      src: youtube
    },
    {
      name: 'instagram',
      src: instagram
    },
  ];

  return (
    <div className={classes.root}>
      <div className='footerRoot'>
        <Grid className={`${classes.leftFooter} leftFooter`} item lg={6} md={6} sm={12} xs={12}>
          <div className='footTop'>
            <div className='leftTop'>
              <Typography variant='h4' component='h4' className={classes.header}>
                Theo dõi tin tức{' '}
              </Typography>
              <Typography variant='h4' component='h4' className={classes.header}>
                mới nhất từ chúng tôi{' '}
              </Typography>
            </div>
            <Grid className={classes.logoFooter} style={matches ? { display: 'block' } : {}}>
              <img alt='logo-footer' src={logoFooter} />
            </Grid>
          </div>
          <Grid container alignItems='center' className={classes.emailInput}>
            <Grid item>
              <TextField
                autoComplete='email'
                className={classes.field}
                fullWidth
                name='email'
                type='email'
                label='Địa chỉ email'
              />
            </Grid>
            <img alt='submit-footer' src={submitBtn} />
          </Grid>
          <Grid className={classes.logoFooter} style={matches ? { display: 'none' } : {}}>
            <img alt='logo-footer' src={logoFooter} />
          </Grid>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={6} className={classes.rightFooter}>
          <Grid className={classes.links}>
            <MenuList className={`${classes.menuList} menuList`}>
              {menu.map((item) => {
                const { id = '', title = '', firstSubTitle = '', secondSubTitle = '' } = item;

                return (
                  <MenuItem key={id} className={classes.menu}>
                    <Typography variant='h4' component='h4' className={`${classes.header} ${classes.titleHeader} `}>
                      {title}
                    </Typography>
                    <Typography variant='h5' component='h5' className={`${classes.header} ${classes.subTitle}`}>
                      {firstSubTitle}
                    </Typography>
                    <Typography variant='h5' component='h5' className={`${classes.header} ${classes.subTitle}`}>
                      {secondSubTitle}
                    </Typography>
                  </MenuItem>
                );
              })}
            </MenuList>
            <Grid className={classes.listIcons}>
              {iconList.map((item) => {
                const { name = '', src = '' } = item;
                return (
                  <div key={name} className={classes.icon}>
                    <IconButton className={classes.buttonSocial}>
                      <img alt={name} src={src} />
                    </IconButton>
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
