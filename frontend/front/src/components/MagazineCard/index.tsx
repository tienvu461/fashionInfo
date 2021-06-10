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
    author = '',
    title = '',
    summary = '',
    created_at: createAt = ''
  } = cardProps;

  const formatDate = (time: number) => moment(time * 1000).fromNow();

    return (
      <>
        <Card className={`${classes.root} root-card`}>
          <CardActionArea>
            <CardMedia
              className={`${classes.cardMagazine} card-magazine`}
              image={cardImg}
              title='Contemplative Reptile'
            />
            <CardContent className='card-magazine-content'>
              <div className='author-magazine'>
                <Typography className={`${classes.textTitle} ${classes.author}`} gutterBottom variant='h6' component='h2'>
                  {`Author ${author}`}
                </Typography>
                <Divider className={classes.divider} />
                <Typography className={`${classes.textTitle} ${classes.time}`} gutterBottom variant='h6' component='h2'>
                  {formatDate(createAt)}
                </Typography>
              </div>
              <Typography variant='body2' color='textSecondary' component='p'>
                {title}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {summary}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
}

export default MagazineCard;
