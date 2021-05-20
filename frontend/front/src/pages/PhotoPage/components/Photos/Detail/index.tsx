/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  Grid,
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { getDetailAction } from '../../../../../features/Photo/photoAction';
import HeartIcon from '../../../../../assets/images/heart.svg';
import ShareIcon from '../../../../../assets/images/share.svg';
import useStyles from './useStyles';
import { RootState } from '../../../../../store/store';

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailAction(id));
  }, [dispatch, id]);

  const photoDetail = useSelector(
    (state: RootState) => state.photo.photoDetail
  );

  const detailInfo = useSelector(
    (state: RootState) => state.photo.photoDetail.detail_info
  );

  const arrInfo: Array<{
    name: string;
    value: string;
  }> = [
    {
      name: 'Tên (tuổi)',
      value: detailInfo?.model_name,
    },
    {
      name: 'Ngày chụp',
      value: moment(detailInfo?.shoot_date).format('DD-MM-YYYY'),
    },
    {
      name: 'Địa điểm',
      value: detailInfo?.location,
    },
    {
      name: 'Nghề nghiệp',
      value: detailInfo?.model_job,
    },
    {
      name: 'Phong cách',
      value: 'Vintage, Casual',
    },
    {
      name: 'Thương hiệu',
      value: detailInfo?.brand,
    },
    {
      name: 'Instagram',
      value: detailInfo?.brand || '',
    },
    {
      name: 'Photographer',
      value: detailInfo?.photographer,
    },
  ];

  const renderInformation = () => (
    <>
      {arrInfo.map((item: { name: string; value: string }, index: number) => {
        const { name = '', value = '' } = item;
        return (
          <React.Fragment key={`${index + 1}`}>
            <Grid item lg={4} md={4} sm={12} wrap='wrap' xl={12} xs={12}>
              <Typography className={classes.name} component='h6' variant='h6'>
                {name}
              </Typography>
            </Grid>
            <Grid item lg={8} md={8} sm={12} wrap='wrap' xl={12} xs={12}>
              <Typography className={classes.value} component='h6' variant='h6'>
                {value}
              </Typography>
            </Grid>
          </React.Fragment>
        );
      })}
    </>
  );

  const renderTags = () => {
    const { tags: listTags = [] } = photoDetail;

    return (
      <Grid item lg={6} md={6} sm={6} wrap='wrap' xl={12} xs={12}>
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
        <Grid
          className={classes.gridPhoto}
          item
          lg={6}
          md={6}
          sm={6}
          spacing={2}
          wrap='wrap'
          xl={4}
          xs={12}
        >
          <Paper className={classes.paper}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.picture}
                  image={pathImg}
                  title='Contemplative Reptile'
                />
              </CardActionArea>
              <div>
                <div className={classes.actions}>
                  <div className={classes.left}>
                    <img alt='heart-icon' src={HeartIcon} />
                    <div className={classes.num}>8</div>
                  </div>
                  <div className={classes.right}>
                    <img alt='share-icon' src={ShareIcon} />
                  </div>
                </div>
              </div>
            </Card>
          </Paper>
        </Grid>
        <Grid item lg={6} md={6} sm={6} spacing={2} wrap='wrap' xl={4} xs={12}>
          <div className={classes.information}>
            <Grid container lg={12} md={12} sm={12} wrap='wrap' xl={12} xs={12}>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                spacing={2}
                wrap='wrap'
                xl={12}
                xs={12}
              >
                <Typography
                  className={classes.title}
                  component='h4'
                  variant='h4'
                >
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
    </div>
  );
}

export default Detail;
