/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardActionArea, useMediaQuery } from '@material-ui/core';
import LazyLoad from 'react-lazyload';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { toast } from 'react-toastify';

import { HOST } from 'src/apis';
import { ROUTE_PHOTO } from 'src/constants';
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

const Photo: React.FunctionComponent<PropsType> = (props) => {
  const classes = useStyles();
  const { pathImg, id, activities: { likes = 0, comments } = {}, userLikes = [] } = props;
  const dispatch = useDispatch<any>();
  const history = useHistory();
  const [likeAction, setLikeAction] = useState<boolean>(false);
  const [like, setLike] = useState<number>(likes);

  const matches = useMediaQuery('(min-width:1600px)');
  const matches1 = useMediaQuery('(min-width:960px)');
  const matches2 = useMediaQuery('(max-width:960px)');

  const checkPathImg = (path) => {
    if (path.includes(HOST)) {
      return path;
    }

    return `${HOST}${path}`;
  };
  const loginStatus = useSelector((state: any) => state.login.loginResponse?.status);
  const userID = useSelector((state: any) => state.login.loginResponse?.userID);

  const likePhoto = (photo_id: string | number, key: string) => {
    if (loginStatus === 200) {
      const credentials = JSON.parse(getCredentialsFromLocalStorage());
      dispatch(likePhotoAction({ user_id: credentials.userID, photo_id })).then(() => {
        if (key === 'like') {
          setLikeAction(true);
          setLike(like + 1);
        } else {
          setLikeAction(false);
          setLike(like - 1);
        }
      });
    } else {
      toast.warn('Please login your account');
    }
  };

  useEffect(() => {
    let checkUserLike = userLikes.map((item) => item === userID);
    checkUserLike = checkUserLike.filter((item) => item === true);
    if (checkUserLike[0]) {
      setLikeAction(checkUserLike[0]);
    }
  }, [userLikes, userID]);

  const controlHeithImg = () => {
    if (matches) {
      return 600;
    }
    if (matches1) {
      return 450;
    }
    if (matches2) return 600;

    return 600;
  };

  return (
    <>
      <Card className={`${classes.card} card`}>
        <LazyLoad height={controlHeithImg()}>
          <CardActionArea onClick={() => history.push(`${ROUTE_PHOTO}/${id}`)}>
            <img className={`${classes.picture} picture`} alt='Feature Photos' src={checkPathImg(pathImg)} />
          </CardActionArea>
        </LazyLoad>
        {
          matches2 ? null : (
            <div className='cardActions'>
              <div className={classes.actions}>
                <div className={classes.left}>
                  <div className={classes.leftActions}>
                    {likeAction ? (
                      <FavoriteIcon style={{ color: 'red' }} onClick={() => likePhoto(id, 'unlike')} />
                    ) : (
                      <img
                        alt='heart-icon'
                        onClick={() => likePhoto(id, 'like')}
                        className={classes.icon}
                        src={HeartIcon}
                      />
                    )}
                    <div className={classes.num}>{like}</div>
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
          )
        }
      </Card>
      {matches2 ? (
        <div className='cardActions'>
          <div className={classes.actions}>
            <div className={classes.left}>
              <div className={classes.leftActions}>
                {likeAction ? (
                  <FavoriteIcon style={{ color: 'red' }} onClick={() => likePhoto(id, 'unlike')} />
                ) : (
                  <img
                    alt='heart-icon'
                    onClick={() => likePhoto(id, 'like')}
                    className={classes.icon}
                    src={HeartIcon}
                  />
                )}
                <div className={classes.num}>{like}</div>
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
      ) : null}
    </>
  );
};

export default Photo;
