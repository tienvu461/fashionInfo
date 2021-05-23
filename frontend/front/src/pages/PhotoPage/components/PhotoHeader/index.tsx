import React from 'react';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import BannerPic from '../../../../assets/images/photos/hotPic.jpg';

import useStyles from './useStyles';

function PhotoHeader(): JSX.Element {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:600px)');

  const bannerInfo: {
    headTitle: string;
    subTitle: string;
    image: string;
  } = {
    headTitle: 'SNAP SHOOT OF THE WEEK',
    subTitle: 'Proudly freature',
    image: BannerPic,
  };

  return (
    <Grid className={classes.root} container>
      <Grid
        className={matches ? classes.leftSectionMatches : classes.leftSection}
        item
        sm={matches ? 12 : 6}
        xs={12}
      >
        <Typography className={classes.subline} component='h6' variant='h6'>
          {bannerInfo.subTitle}
        </Typography>
        <Typography className={classes.headline} component='h1' variant='h1'>
          {bannerInfo.headTitle}
        </Typography>
      </Grid>
      <Grid
        className={classes.rightSection}
        item
        sm={6}
        style={matches ? { marginBottom: '80px' } : {}}
        xs={12}
      >
        <img
          alt='banner-pic'
          className={classes.imgBanner}
          src={bannerInfo.image}
        />
      </Grid>
    </Grid>
  );
}

export default PhotoHeader;
