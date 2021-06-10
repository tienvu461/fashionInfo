/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Divider, Typography, useMediaQuery } from '@material-ui/core';
import moment from 'moment';

import cardImg from 'src/assets/images/magazine/magazineCard.png';
import useStyles from './useStyles';
import './_magazineCard.scss';

interface MagazineCardProps {
  cardProps: any;
}

function MagazineCard(props: MagazineCardProps): JSX.Element {
  const classes = useStyles();
  const { cardProps } = props;
  const {
    // id = '',
    sub_category: subCategory = '',
    title = '',
    summary = '',
    created_at: createAt = '',
    thumbnail = '',
  } = cardProps;
  const screenMin = useMediaQuery('(min-width:1280px)');
  const screenMax = useMediaQuery('(max-width:1920px)');

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

    return (
      <>
        <Card className={`${classes.root} root-card`}>
          <CardActionArea>
            <CardMedia
              className={`${classes.cardMagazine} card-magazine`}
              image={thumbnail || cardImg}
              title='Contemplative Reptile'
            />
            <CardContent className='card-magazine-content'>
              <div className='sub-category-magazine'>
                <Typography
                  className={`${classes.headerText} ${classes.subCategory}`}
                  gutterBottom
                  variant='h6'
                  component='h6'
                >
                  {subCategory}
                </Typography>
                <Divider className={classes.divider} />
                <Typography
                  className={`${classes.headerText} ${classes.time}`}
                  gutterBottom
                  variant='h6'
                  component='h6'
                >
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
}

export default MagazineCard;
