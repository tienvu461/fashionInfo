/* eslint-disable import/no-unresolved */
import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import cardImg from 'src/assets/images/magazine/magazineCard.png';
import useStyles from './useStyles';
import './_magazineCard.scss';

function MagazineCard(): JSX.Element {
  const classes = useStyles();

    return (
      <>
        <Card className={`${classes.root} root-card`}>
          <CardActionArea>
            <CardMedia className={`${classes.cardMagazine} card-magazine`} image={cardImg} title='Contemplative Reptile' />
            <CardContent className='card-magazine-content'>
              <Typography gutterBottom variant='h5' component='h2'>
                Lizard
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
}

export default MagazineCard;
