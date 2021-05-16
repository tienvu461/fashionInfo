import React, { useState } from 'react';
import {
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
} from '@material-ui/core';
import BannerPic from '../../../../../assets/images/photos/hotPic.jpg';
import HeartIcon from '../../../../../assets/images/heart.svg';
import CommentIcon from '../../../../../assets/images/comment.svg';
import ShareIcon from '../../../../../assets/images/share.svg';

import useStyles from '../useStyles';
import './_photo.scss';

function Photo(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <Card className='card'>
          <CardActionArea>
            <CardMedia
              className={classes.picture}
              image={BannerPic}
              title='Contemplative Reptile'
            />
          </CardActionArea>
          <div className='cardActions'>
            <div className={classes.actions}>
              <div className={classes.left}>
                <div className={classes.leftActions}>
                  <img
                    alt='heart-icon'
                    className={classes.icon}
                    src={HeartIcon}
                  />
                  <div>8</div>
                </div>
                <div className={classes.leftActions}>
                  <img
                    alt='comment-icon'
                    className={classes.icon}
                    src={CommentIcon}
                  />
                  <div>11</div>
                </div>
              </div>
              <div className={classes.right}>
                <img alt='share-icon' src={ShareIcon} />
              </div>
            </div>
          </div>
        </Card>
      </Paper>
    </>
  );
}

export default Photo;
