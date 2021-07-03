/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import { toast } from 'react-toastify';
import { Grid, Paper, Card, CardActionArea, CardMedia, Typography, Divider, CircularProgress } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { RootState } from 'src/store/store';
import HeartIcon from 'src/assets/images/heart.svg';
import ShareIcon from 'src/assets/images/share.svg';
import Tags from 'src/components/Tags';
import { loadingResponse } from 'src/features/Loading/LoadingSlice';
import { getDetailAction, likePhotoAction } from 'src/features/Photo/photoAction';

import PhotoComment from './components/PhotoComment';
import SuggestionComponent from './components/Suggestion';

import useStyles from './useStyles';
import './_detail.scss';

interface DetailProps {
  match: {
    params: {
      id: string;
    };
  };
}

const DetaiPhoto: React.FunctionComponent<DetailProps> = (props) => {
  const { match: { params: { id = '' } = {} } = {} } = props;

  const classes = useStyles();
  // const [loading, setLoading] = useState<boolean>(false);
  const [likeAction, setLikeAction] = useState<boolean>(false);
  const dispatch = useDispatch<any>();

  const photoDetail = useSelector((state: RootState) => state.photo.photoDetail);
  const loading = useSelector((state: RootState) => state.loading.isLoading);
  const [like, setLike] = useState<number>(0);

  const userLikes = useSelector((state: RootState) => state.photo.photoDetail?.user_likes);
  const detailInfo = useSelector((state: RootState) => state.photo.photoDetail.detail_info);
  const photoComment = useSelector((state: RootState) => state.photo.photoComment);
  const userID = useSelector((state: any) => state.login.loginResponse?.userID);
  const loginStatus = useSelector((state: any) => state.login.loginResponse?.status);

  useEffect(() => {
    dispatch(loadingResponse(true));

    window.scrollTo({
      top: 100,
      left: 0,
      behavior: 'smooth',
    });

    // fetch data detail information
    dispatch(getDetailAction(id)).then((res) => {
      const { status = '', data: { likes = 0 } = {} } = res;
      if (status === 200) {
        dispatch(loadingResponse(false));
        setLike(likes);
      }
    });
  }, [dispatch, id]);

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

  // Fecch detail page again after comment to get the newest comment list
  useEffect(() => {
    if (photoComment.cmt_id) {
      dispatch(getDetailAction(photoComment.photo_id));
    }
  }, [dispatch, photoComment, photoComment.cmt_id]);

  const arrInfo: Array<{
    name: string;
    value: string;
  }> = [
    {
      name: 'Tên (tuổi)',
      value: detailInfo?.model_name || 'N/A',
    },
    {
      name: 'Ngày chụp',
      value: moment(detailInfo?.shoot_date * 1000).format('DD-MM-YYYY') || 'N/A',
    },
    {
      name: 'Địa điểm',
      value: detailInfo?.location || 'N/A',
    },
    {
      name: 'Nghề nghiệp',
      value: detailInfo?.model_job || 'N/A',
    },
    {
      name: 'Phong cách',
      value: detailInfo?.style || 'N/A',
    },
    {
      name: 'Thương hiệu',
      value: detailInfo?.brand || 'N/A',
    },
    {
      name: 'Instagram',
      value: detailInfo?.social_url || 'N/A',
    },
    {
      name: 'Photographer',
      value: detailInfo?.photographer || 'N/A',
    },
  ];

  const renderInformation = () => (
    <>
      {arrInfo.map((item: { name: string; value: string }, index: number) => {
        const { name = '', value = '' } = item;
        return (
          <React.Fragment key={`${index + 1}`}>
            <Grid item lg={4} md={6} sm={6} xl={6} xs={6}>
              <Typography className={classes.name} component='h6' variant='h6'>
                {name}
              </Typography>
            </Grid>
            <Grid item lg={8} md={6} sm={6} xl={6} xs={6}>
              <div className={classes.valueName}>
                <Typography
                  className={name === 'Instagram' || name === 'Photographer' ? classes.value2 : classes.value}
                  component='h6'
                  variant='h6'
                >
                  {value}
                </Typography>
              </div>
            </Grid>
          </React.Fragment>
        );
      })}
    </>
  );

  const likePhoto = (photo_id: string | number, key: string) => {
    if (loginStatus === 200) {
      dispatch(likePhotoAction({ user_id: userID, photo_id })).then(() => {
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

  const renderDetailPhoto = () => {
    const { image_path: pathImg = '', tags: listTags = [] } = photoDetail;

    return (
      <>
        <div>
          <Paper className={loading ? classes.paperLoading : classes.paper}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  alt='Contemplative Reptile'
                  className={`${classes.picture} gridPhoto`}
                  component='img'
                  image={pathImg}
                  title='Contemplative Reptile'
                />
              </CardActionArea>
              <div className={classes.actions}>
                <div className={classes.left}>
                  {likeAction ? (
                    <FavoriteIcon
                      onClick={() => likePhoto(id, 'unlike')}
                      className={classes.heartIcon}
                      style={{ color: 'red' }}
                    />
                  ) : (
                    <img
                      onClick={() => likePhoto(id, 'like')}
                      className={classes.heartIcon}
                      alt='heart-icon'
                      src={HeartIcon}
                    />
                  )}
                  <div className={classes.num}>{like}</div>
                </div>
                <div className={classes.right}>
                  <img alt='share-icon' src={ShareIcon} />
                </div>
              </div>
            </Card>
          </Paper>
        </div>
        <div className={`${classes.information} gridPhoto information`}>
          <Grid container>
            <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
              <Typography className={classes.title} component='h4' variant='h4'>
                Thông tin
              </Typography>
            </Grid>
            {renderInformation()}
            <Tags page='photo' listTags={listTags} />;
          </Grid>
        </div>
      </>
    );
  };

  if (loading) {
 return (
   <div className={classes.loading}>
     <CircularProgress color='primary' />
   </div>
  );
}

  return (
    <div className={classes.detailRoot}>
      <div className={`${classes.root} detailRoot`}>
        <div className='photoDetail'>{renderDetailPhoto()}</div>
        <Divider />
        <PhotoComment paramsId={id} />
      </div>
      <SuggestionComponent paramsId={id} />
    </div>
  );
};

export default DetaiPhoto;
