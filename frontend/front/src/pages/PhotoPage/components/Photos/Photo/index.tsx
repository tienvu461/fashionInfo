/* eslint-disable import/no-unresolved */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Card, CardActionArea, CardMedia } from '@material-ui/core';
import { HOST } from 'src/apis';
import { ROUTE_PHOTO } from 'src/constants';
import BannerPic from 'src/assets/images/photos/hotPic.jpg';
import HeartIcon from 'src/assets/images/heart.svg';
import CommentIcon from 'src/assets/images/comment.svg';
import ShareIcon from 'src/assets/images/share.svg';

import useStyles from '../useStyles';
import './_photo.scss';

interface PropsType {
  pathImg: string;
  id: number;
  activities: {
    likes: number;
    comments: number;
  };
}

function Photo(props: PropsType): JSX.Element {
  const classes = useStyles();
  const { pathImg, id, activities: { likes = 0, comments } = {} } = props;

  const checkPathImg = (path) => {
    if (path.includes(HOST)) {
      return path;
    }

    return `${HOST}${path}`;
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Link to={`${ROUTE_PHOTO}/${id}`}>
          <Card className='card'>
            <CardActionArea>
              <CardMedia
                alt='Contemplative Reptile'
                className={classes.picture}
                component='img'
                image={checkPathImg(pathImg) || BannerPic}
                title='Contemplative Reptile'
              />
            </CardActionArea>
            <div className='cardActions'>
              <div className={classes.actions}>
                <div className={classes.left}>
                  <div className={classes.leftActions}>
                    <img alt='heart-icon' className={classes.icon} src={HeartIcon} />
                    <div className={classes.num}>{likes}</div>
                  </div>
                  <div className={classes.leftActions}>
                    <img alt='comment-icon' className={classes.icon} src={CommentIcon} />
                    <div className={classes.num}>{comments}</div>
                  </div>
                </div>
                <div className={classes.right}>
                  <img alt='share-icon' src={ShareIcon} />
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </Paper>
    </>
  );
}

export default Photo;
