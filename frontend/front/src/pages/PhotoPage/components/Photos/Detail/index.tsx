/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
 Grid, Paper, Card, CardActionArea, CardMedia, Typography, Divider, CircularProgress
} from '@material-ui/core';
import { getDetailAction, getPhotoSuggestAction } from '../../../../../features/Photo/photoAction';
import HeartIcon from '../../../../../assets/images/heart.svg';
import ShareIcon from '../../../../../assets/images/share.svg';
import useStyles from './useStyles';
import { RootState } from '../../../../../store/store';
import CommentComponent from './components/Comment';
import SuggestionComponent from './components/Suggestion';

interface DetailProps {
  match: {
    params: {
      id: string;
    };
  };
}

function Detail(props: DetailProps): JSX.Element {
  const { match: { params: { id = '' } = {} } = {} } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    setLoading(true);

    window.scrollTo({
      top: 100,
      left: 0,
      behavior: 'smooth',
    });

    // fetch data detail information
    dispatch(getDetailAction(id)).then((res) => {
      const { status = '' } = res;
      if (status === 200) {
        setLoading(false);
      }
    });

    // fetch data suggestion photo list
    dispatch(getPhotoSuggestAction(1, id));
  }, [dispatch, id]);

  const photoDetail = useSelector((state: RootState) => state.photo.photoDetail);
  const photoSuggestionList = useSelector((state: RootState) => state.photo.photoSuggestionList.listPhoto);

  const detailInfo = useSelector((state: RootState) => state.photo.photoDetail.detail_info);
  const dataPhoto = useSelector((state: RootState) => state.photo.photoSuggestionList.dataOrigin);

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
      value: moment(detailInfo?.shoot_date).format('DD-MM-YYYY') || 'N/A',
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
      value: 'Vintage, Casual' || 'N/A',
    },
    {
      name: 'Thương hiệu',
      value: detailInfo?.brand || 'N/A',
    },
    {
      name: 'Instagram',
      value: detailInfo?.brand || 'N/A',
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
            <Grid item lg={4} md={6} sm={12} wrap='wrap' xl={12} xs={6}>
              <Typography className={classes.name} component='h6' variant='h6'>
                {name}
              </Typography>
            </Grid>
            <Grid item lg={8} md={6} sm={12} wrap='wrap' xl={12} xs={6}>
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

  const renderTags = () => {
    const { tags: listTags = [] } = photoDetail;

    return (
      <Grid item lg={6} md={12} sm={12} wrap='wrap' xl={12} xs={12}>
        <div className={classes.tags}>
          {listTags.map((item: string, index: number) => (
            <Grid key={`${index + 1}`} className={classes.tag}>
              <Typography className={classes.tagText}>#{item}</Typography>
            </Grid>
          ))}
        </div>
      </Grid>
    );
  };

  const renderDetailPhoto = () => {
    const { image_path: pathImg = '' } = photoDetail;

    return (
      <>
        <Grid className={classes.gridPhoto} item lg={6} md={6} sm={8} spacing={2} wrap='wrap' xl={12} xs={12}>
          <Paper className={loading ? classes.paperLoading : classes.paper}>
            {loading ? (
              <div className={classes.loading}>
                <CircularProgress color='primary' />
              </div>
            ) : (
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia className={classes.picture} image={pathImg} title='Contemplative Reptile' />
                </CardActionArea>
                <div>
                  <div className={classes.actions}>
                    <div className={classes.left}>
                      <img alt='heart-icon' src={HeartIcon} />
                      <div className={classes.num}>{photoDetail.likes}</div>
                    </div>
                    <div className={classes.right}>
                      <img alt='share-icon' src={ShareIcon} />
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </Paper>
        </Grid>
        <Grid item lg={6} md={6} sm={4} spacing={2} wrap='wrap' xl={12} xs={12}>
          <div className={classes.information}>
            <Grid container lg={12} md={12} sm={12} wrap='wrap' xl={12} xs={12}>
              <Grid item lg={12} md={12} sm={12} spacing={2} wrap='wrap' xl={12} xs={12}>
                <Typography className={classes.title} component='h4' variant='h4'>
                  Thông tin
                </Typography>
              </Grid>

              {renderInformation()}
              {renderTags()}
            </Grid>
          </div>
        </Grid>
      </>
    );
  };

  return (
    <div className={`${classes.root} root`}>
      <Grid container>{renderDetailPhoto()}</Grid>
      <Divider />
      <div
        style={{
          background: '#EEEEEF',
          height: '100vh',
        }}
      >
        <CommentComponent />
      </div>
      <SuggestionComponent dataPhoto={dataPhoto} paramsId={id} photoSuggestionList={photoSuggestionList} />
    </div>
  );
}

export default Detail;
