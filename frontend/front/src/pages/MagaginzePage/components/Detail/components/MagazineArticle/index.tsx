/* eslint-disable import/no-unresolved */
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Typography, Divider } from '@material-ui/core';
// import FavoriteIcon from '@material-ui/icons/Favorite';

import { RootState } from 'src/store/store';
import HeartIcon from 'src/assets/images/heart.svg';
import ShareIcon from 'src/assets/images/share.svg';
import CommentIcon from 'src/assets/images/comment.svg';

import './_magazineArticle.scss';
import useStyles from './useStyles';

function MagazineArticle(): JSX.Element {
  const classes = useStyles();

  const magazineDetail = useSelector((state: RootState) => state.magazine.magazineDetail);
  const formatDate = (time: number) => moment(time * 1000).fromNow();
  const {
    sub_category: subCategory = '',
    created_at: createAt = 0,
    title = '',
    author = '',
    likes = 0,
    comments = [],
    thumbnail = '',
  } = magazineDetail;
  console.log(magazineDetail);

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
            {/* <FavoriteIcon
              // onClick={() => likePhoto(id, 'unlike')}
              className={classes.heartIcon}
            /> */}
            <div className={classes.flex}>
              <img className={classes.heartIcon} alt='heart-icon' src={HeartIcon} />
              <div className={classes.num}>{likes}</div>
            </div>
            <div className={classes.flex}>
              <img alt='comment-icon' className={classes.heartIcon} src={CommentIcon} />
              <div className={classes.num}>{comments.length}</div>
            </div>
            <img alt='share-icon' className={classes.heartIcon} src={ShareIcon} />
          </div>
        </div>
        <div className='article-thumbnail'>
          <img alt='article-thumbnail' src={thumbnail} />
        </div>
      </>
    );
}

export default MagazineArticle;
