/* eslint-disable object-curly-newline */
import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Card, CardActionArea, CardMedia } from '@material-ui/core';
import BannerPic from '../../../../../assets/images/photos/hotPic.jpg';
import HeartIcon from '../../../../../assets/images/heart.svg';
import CommentIcon from '../../../../../assets/images/comment.svg';
import ShareIcon from '../../../../../assets/images/share.svg';
import { ROUTE_PHOTO } from '../../../../../constants';

import useStyles from '../useStyles';
import './_photo.scss';

interface PropsType {
  pathImg: string;
  id: number;
}

function Photo(props: PropsType): JSX.Element {
  const classes = useStyles();
  const { pathImg, id } = props;

  return (
    <>
      <Paper className={classes.paper}>
        <Link to={`${ROUTE_PHOTO}/${id}`}>
          <Card className='card'>
            <CardActionArea>
              <CardMedia
                className={classes.picture}
                image={pathImg || BannerPic}
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
                    <div className={classes.num}>8</div>
                  </div>
                  <div className={classes.leftActions}>
                    <img
                      alt='comment-icon'
                      className={classes.icon}
                      src={CommentIcon}
                    />
                    <div className={classes.num}>11</div>
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
