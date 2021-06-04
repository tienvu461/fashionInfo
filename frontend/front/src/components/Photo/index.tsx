/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { toast } from 'react-toastify';
import { HOST } from 'src/apis';
import { ROUTE_PHOTO } from 'src/constants';
import BannerPic from 'src/assets/images/photos/hotPic.jpg';
import HeartIcon from 'src/assets/images/heart.svg';
import CommentIcon from 'src/assets/images/comment.svg';
import ShareIcon from 'src/assets/images/share.svg';
import { likePhotoAction } from 'src/features/Photo/photoAction';
import { getCredentialsFromLocalStorage } from 'src/utils/localStorage';

import useStyles from './useStyles';
import './_photo.scss';

interface PropsType {
  pathImg: string;
  id: number | string;
  activities: any;
  userLikes: Array<number>;
}

function Photo(props: PropsType): JSX.Element {
  const classes = useStyles();
  const { pathImg, id, activities: { likes = 0, comments } = {}, userLikes = [] } = props;
  const dispatch = useDispatch<any>();
  const history = useHistory();
  const [likeAction, setLikeAction] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);

  const checkPathImg = (path) => {
    if (path.includes(HOST)) {
      return path;
    }

    return `${HOST}${path}`;
  };
  const loginStatus = useSelector((state: any) => state.login.loginResponse?.status);
  const userID = useSelector((state: any) => state.login.loginResponse?.userID);

  const likePhoto = (photo_id: string | number) => {
    if (loginStatus === 200) {
      const credentials = JSON.parse(getCredentialsFromLocalStorage());
      dispatch(likePhotoAction({ user_id: credentials.userID, photo_id })).then(() => {
      setClick(!click);
      setLikeAction(!likeAction);
      });
    } else {
      toast.warn('Please login your account');
    }
  };

  const updateLike = () => {
    if (likeAction && click) {
      return likes + 1;
    }
    return likes;
  };

  useEffect(() => {
    let checkUserLike = userLikes.map((item) => item === userID);
    checkUserLike = checkUserLike.filter((item) => item === true);
    if (checkUserLike[0]) {
      setLikeAction(checkUserLike[0]);
    }
  }, [userLikes, userID]);

  return (
    <>
      <Card className={`${classes.card} card`}>
        <CardActionArea onClick={() => history.push(`${ROUTE_PHOTO}/${id}`)}>
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
                {likeAction ? (
                  <FavoriteIcon style={{ color: 'red' }} onClick={() => likePhoto(id)} />
                ) : (
                  <img alt='heart-icon' onClick={() => likePhoto(id)} className={classes.icon} src={HeartIcon} />
                )}
                <div className={classes.num}>{updateLike()}</div>
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
    </>
  );
}

export default Photo;
