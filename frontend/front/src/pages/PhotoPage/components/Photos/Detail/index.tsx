import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const arrInfo: Array<{
    name: string;
    value: string;
  }> = [
    {
      name: 'Tên (tuổi)',
      value: 'Kim JinYoung (35)',
    },
    {
      name: 'Ngày chụp',
      value: '15-03-2021',
    },
    {
      name: 'Ngày đăng',
      value: '30-03-2021',
    },
    {
      name: 'Địa điểm',
      value: 'Vincom Center, Đồng Khởi, HCMC',
    },
    {
      name: 'Nghề nghiệp',
      value: 'Nhân viên văn phòng',
    },
    {
      name: 'Phong cách',
      value: 'Vintage, Casual',
    },
    {
      name: 'Thương hiệu',
      value: 'KIDO',
    },
    {
      name: 'Photographer',
      value: 'Dang Vinh Quang',
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
