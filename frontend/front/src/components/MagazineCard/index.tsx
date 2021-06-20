/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Card, CardActionArea, CardContent, Divider, Typography, useMediaQuery } from '@material-ui/core';

import cardImg from 'src/assets/images/magazine/magazineCard.png';
import { HOST } from 'src/apis';
import { ROUTE_MAGAZINE_DETAIL } from 'src/constants';
import useStyles from './useStyles';
import './_magazineCard.scss';

interface MagazineCardProps {
  cardProps: any;
}

const MagazineCard: React.FunctionComponent<MagazineCardProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { cardProps } = props;
  const {
    id = '',
    sub_category: subCategory = '',
    title = '',
    summary = '',
    created_at: createAt = '',
    thumbnail = '',
  } = cardProps;

  const screenMin = useMediaQuery('(min-width:1280px)');
  const screenMax = useMediaQuery('(max-width:1920px)');
  const matches = useMediaQuery('(min-width:1600px)');
  const matches1 = useMediaQuery('(min-width:1280px)');
  const matches2 = useMediaQuery('(min-width:600px)');

  const formatDate = (time: number) => moment(time * 1000).fromNow();
  const formatText = (text: string, key: string) => {
    if (key === 'title') {
      if (screenMin && screenMax && text.length >= 30) {
        const newText = text.replace(/^(.{40}[^\s]*).*/, '$1');
        return `${newText}...`;
      }
    } else if (screenMin && screenMax && text.length >= 30) {
      const newText = text.replace(/^(.{60}[^\s]*).*/, '$1');
      return `${newText}...`;
    }
    return text;
  };

  const checkPathImg = (path) => {
    if (path.includes(HOST)) {
      return path;
    }

    return `${HOST}${path}`;
  };

  const controlWidthImg = () => {
    if (matches) {
      return 480;
    }
    if (matches1) {
      return 360;
    }
    if (matches2) return 480;

    return '100%';
  };

  const controlHeithImg = () => {
    if (matches) {
      return 350;
    }
    if (matches1) {
      return 262.5;
    }
    if (matches2) return 350;

    return '100%';
  };

  return (
    <>
      <Card className={`${classes.root} root-card`}>
        <CardActionArea onClick={() => history.push(`${ROUTE_MAGAZINE_DETAIL}/${id}`)}>
          <LazyLoadImage
            alt='Contemplative Reptile'
            className={`${classes.cardMagazine} card-magazine`}
            src={checkPathImg(thumbnail || cardImg)}
            effect='blur'
            height={controlHeithImg()}
            width={controlWidthImg()}
            delayMethod
          />
          <CardContent className='card-magazine-content'>
            <div className='sub-category-magazine'>
              <Typography className={`${classes.headerText} ${classes.subCategory}`} variant='h6' component='h6'>
                {subCategory}
              </Typography>
              <Divider className={classes.divider} />
              <Typography className={`${classes.headerText} ${classes.time}`} variant='h6' component='h6'>
                {formatDate(createAt)}
              </Typography>
            </div>
            <Typography className={`${classes.titleCard} titleCard`} variant='h4' color='textSecondary' component='h4'>
              {formatText(title, 'title')}
              {/* {title} */}
            </Typography>
            <Typography className={`${classes.summary} summary`} variant='h6' color='textSecondary' component='h6'>
              {formatText(summary, 'summary')}
              {/* {summary} */}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default MagazineCard;
