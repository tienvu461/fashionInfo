/* eslint-disable import/no-unresolved */
import React from 'react';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import BannerPic from 'src/assets/images/photos/hotPic.jpg';
import { RootState } from 'src/store/store';
import { HOST } from 'src/apis';

import useStyles from './useStyles';

function PhotoHeader(): JSX.Element {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:600px)');
  const matches1 = useMediaQuery('(min-width:1600px)');
  const matches2 = useMediaQuery('(min-width:960px)');
  const matches3 = useMediaQuery('(max-width:960px)');

  const featurePhoto = useSelector((state: RootState) => state.featurePhoto.featureList);

  const bannerInfo: {
    headTitle: string;
    subTitle: string;
    image: string;
  } = {
    headTitle: 'SNAP SHOOT OF THE WEEK',
    subTitle: 'Proudly freature',
    image: BannerPic,
  };

  const checkPathImg = (path) => {
    console.log(path);
    if (path?.includes(HOST)) {
      return path;
    }

    return `${HOST}${path}`;
  };

  const controlWidthImg = () => {
    if (matches1) {
      return '100%';
    }
    if (matches2) {
      return '100%';
    }
    if (matches3) return '100%';

    return '100%';
  };

  const controlHeithImg = () => {
    if (matches1) {
      return 755;
    }
    if (matches2) {
      return 453;
    }
    if (matches3) return 755;

    return 755;
  };

  return (
    <Grid className={classes.root} container>
      <Grid className={matches ? classes.leftSectionMatches : classes.leftSection} item sm={matches ? 12 : 6} xs={12}>
        <Typography className={classes.subline} component='h6' variant='h6'>
          {bannerInfo.subTitle}
        </Typography>
        <Typography className={classes.headline} component='h1' variant='h1'>
          {bannerInfo.headTitle}
        </Typography>
      </Grid>
      <Grid className={classes.rightSection} item sm={6} style={matches ? { marginBottom: '80px' } : {}} xs={12}>
        {/* <img
          alt='banner-pic'
          className={classes.imgBanner}
          src={bannerInfo.image}
        /> */}
        <LazyLoadImage
          alt='Feature Photo'
          className={classes.imgBanner}
          src={checkPathImg(featurePhoto[0]?.feature_photo)}
          effect='blur'
          height={controlHeithImg()}
          width={controlWidthImg()}
          delayMethod
        />
      </Grid>
    </Grid>
  );
}

export default PhotoHeader;
