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

interface PhotoProps {
  gallery: Array<{
    title: string;
    id: number;
  }>;
  idPhoto: number;
}

function Photo(props: PhotoProps): JSX.Element {
  const { gallery = [], idPhoto = 0 } = props;
  const classes = useStyles();
  const [isHover, setisHover] = useState<boolean>(false);

  const handleOnMouseOut = (id: number) => {
    let hoverItem = false;
    gallery.forEach(({ id: idItem }) => {
      if (idItem === id) hoverItem = true;
    });

    if (hoverItem) {
      setisHover(false);
    }
  };
  const handleOnMouseOver = (id: number) => {
    let hoverItem = false;
    gallery.forEach(({ id: idItem }) => {
      if (idItem === id) hoverItem = true;
    });

    if (hoverItem) {
      setisHover(true);
    }
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Card
          className={classes.card}
          onMouseOut={() => handleOnMouseOut(idPhoto)}
          onMouseOver={() => handleOnMouseOver(idPhoto)}
        >
          <CardActionArea>
            <CardMedia
              className={classes.picture}
              image={BannerPic}
              title='Contemplative Reptile'
            />
          </CardActionArea>
          <CardActions
            className={isHover ? classes.hoverAction : classes.cardActions}
          >
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
          </CardActions>
        </Card>
      </Paper>
    </>
  );
}

export default Photo;
