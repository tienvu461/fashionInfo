/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Divider, Typography } from '@material-ui/core';
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

  const formatDate = (time: number) => moment(time * 1000).fromNow();

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
                  component='h2'
                >
                  {subCategory}
                </Typography>
                <Divider className={classes.divider} />
                <Typography
                  className={`${classes.headerText} ${classes.time}`}
                  gutterBottom
                  variant='h6'
                  component='h2'
                >
                  {formatDate(createAt)}
                </Typography>
              </div>
              <Typography className={classes.titleCard} variant='h4' color='textSecondary' component='h4'>
                {title}
              </Typography>
              <Typography className={classes.summary} variant='h6' color='textSecondary' component='h6'>
                {summary}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
}

export default MagazineCard;