import React, { useState } from 'react';
import {
  Paper,
  Grid,
  // CardContent,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  // Button,
  // Typography,
  // IconButton,
} from '@material-ui/core';
import BannerPic from '../../../../../assets/images/photos/hotPic.jpg';
import HeartIcon from '../../../../../assets/images/heart.svg';
import CommentIcon from '../../../../../assets/images/comment.svg';
import ShareIcon from '../../../../../assets/images/share.svg';

import useStyles from '../useStyles';

function Photo(): JSX.Element {
  const classes = useStyles();
  const [isHover, setisHover] = useState<boolean>(false);

  const handleOnMouseOut = () => {
    setisHover(false);
  };
  const handleOnMouseOver = () => {
    setisHover(true);
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Card
          className={classes.card}
          onMouseOut={handleOnMouseOut}
          onMouseOver={handleOnMouseOver}
        >
          <CardActionArea>
            <CardMedia
              className={classes.picture}
              image={BannerPic}
              title='Contemplative Reptile'
            />
          </CardActionArea>
          <div className={isHover ? classes.hoverAction : classes.cardActions}>
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
