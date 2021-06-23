/* eslint-disable import/no-unresolved */
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Typography, useMediaQuery } from '@material-ui/core';
import BannerPic from 'src/assets/images/photos/hotPic.jpg';
import { RootState } from 'src/store/store';
import { HOST } from 'src/apis';
import { ROUTE_PHOTO } from 'src/constants';

import useStyles from './useStyles';
import './_photoHeader.scss';

function PhotoHeader(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const matches = useMediaQuery('(max-width:600px)');
  const matches1 = useMediaQuery('(min-width:1600px)');
  const matches2 = useMediaQuery('(min-width:960px)');
  const matches3 = useMediaQuery('(max-width:960px)');

  const featurePhoto = useSelector((state: RootState) => state.featurePhoto.featureListPhoto);
  const id = featurePhoto[0]?.feature_photo.photo_id;

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
    if (path?.includes(HOST)) {
      return path;
    }

    return `${HOST}${path}`;
  };

  const controlWidthImg = () => {
    if (matches1) {
      return '985.69px';
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
      return '100%';
    }
    if (matches3) return '100%';

    return 755;
  };

  return (
    <div className='photoHeaderRoot'>
      <div className='photoHeader'>
        <div className={matches ? classes.leftSectionMatches : 'left-section'}>
          <Typography className={`${classes.subline} line-title`} component='h6' variant='h6'>
            {bannerInfo.subTitle}
          </Typography>
          <Typography className={`${classes.headline} line-title headTitle`} component='h1' variant='h1'>
            {bannerInfo.headTitle}
          </Typography>
        </div>
        <div
          onClick={() => history.push(`${ROUTE_PHOTO}/${id}`)}
          className='right-section'
          style={matches ? { marginBottom: '80px' } : {}}
        >
          <LazyLoadImage
            alt='Feature Photo'
            className={classes.imgBanner}
            src={checkPathImg(featurePhoto[0]?.feature_photo.image_path)}
            effect='blur'
            height={controlHeithImg()}
            width={controlWidthImg()}
            delayMethod
          />
        </div>
      </div>
    </div>
  );
}

export default PhotoHeader;
