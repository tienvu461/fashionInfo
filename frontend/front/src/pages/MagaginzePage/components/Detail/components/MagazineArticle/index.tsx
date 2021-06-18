/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { toast } from 'react-toastify';
import ReactHtmlParser from 'react-html-parser';
import { Typography, Divider } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { RootState } from 'src/store/store';
import HeartIcon from 'src/assets/images/heart.svg';
import ShareIcon from 'src/assets/images/share.svg';
import CommentIcon from 'src/assets/images/comment.svg';
import { likeMagazineAction } from 'src/features/Magazine/MagazineAction';

import './_magazineArticle.scss';
import useStyles from './useStyles';

interface MagazineArticleProps {
  handleScrollToComment: any;
}

function MagazineArticle(props: MagazineArticleProps): JSX.Element {
  const classes = useStyles();
  const { handleScrollToComment } = props;
  const dispatch = useDispatch<any>();
  const [likeAction, setLikeAction] = useState<boolean>(false);

  const magazineDetail = useSelector((state: RootState) => state.magazine.magazineDetail);
  const userID = useSelector((state: any) => state.login.loginResponse?.userID);
  const loginStatus = useSelector((state: any) => state.login.loginResponse?.status);

  const formatDate = (time: number) => moment(time * 1000).fromNow();
  const {
    sub_category: subCategory = '',
    created_at: createAt = 0,
    title = '',
    author = '',
    likes = 0,
    comments = [],
    banner = '',
    user_likes: userLikes = [],
    id = 0,
    formatted_markdown: content = '',
  } = magazineDetail;
  console.log(magazineDetail);
  const [like, setLike] = useState<number>(likes);

  useEffect(() => {
    if (userLikes) {
      let checkUserLike = userLikes.map((item) => item === userID);
      checkUserLike = checkUserLike.filter((item) => item === true);
      if (checkUserLike[0]) {
        setLikeAction(checkUserLike[0]);
      } else {
        setLikeAction(false);
      }
    }
  }, [userLikes, userID]);

  const likePhoto = (news_id: string | number, key: string) => {
    if (loginStatus === 200) {
      dispatch(likeMagazineAction({ user_id: userID, news_id })).then(() => {
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

  return (
    <>
      <div className='subtitle'>
        <Typography className={`${classes.headerText} ${classes.subTitleArticle}`} component='h6' variant='h6'>
          {subCategory}
        </Typography>
        <Divider className={classes.divider} />
        <Typography className={`${classes.headerText} ${classes.time}`} gutterBottom variant='h6' component='h6'>
          {formatDate(createAt)}
        </Typography>
      </div>
      <Typography className={classes.mainTitle}>{title}</Typography>
      <div className='article-action'>
        <Typography className={`${classes.headerText} ${classes.authorArticle}`} component='h6' variant='h6'>
          bởi {author}
        </Typography>
        <div className='action-section'>
          <div className={classes.flex}>
            {likeAction ? (
              <FavoriteIcon
                style={{ color: 'red' }}
                onClick={() => likePhoto(id, 'unlike')}
                className={classes.heartIcon}
              />
            ) : (
              <img
                className={classes.heartIcon}
                alt='heart-icon'
                src={HeartIcon}
                onClick={() => likePhoto(id, 'like')}
              />
            )}
            <div className={classes.num}>{like}</div>
          </div>
          <div className={classes.flex}>
            <img
              onClick={() => handleScrollToComment()}
              alt='comment-icon'
              className={classes.heartIcon}
              src={CommentIcon}
            />
            <div className={classes.num}>{comments.length}</div>
          </div>
          <img alt='share-icon' className={classes.heartIcon} src={ShareIcon} />
        </div>
      </div>
      <div className='article-banner'>
        <img alt='article-banner' src={banner} />
      </div>
      <div className='article-content'>{ReactHtmlParser(content)}</div>
    </>
  );
}

export default MagazineArticle;
