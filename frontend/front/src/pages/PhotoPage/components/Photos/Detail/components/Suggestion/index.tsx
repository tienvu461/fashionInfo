/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
import React from 'react';
import {
  Grid,
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  Button,
  Typography,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import useStyles from './useStyles';
import Photo from '../../../Photo';

function SuggestionComponent(): JSX.Element {
  const classes = useStyles();

  const listImg = [
    {
      image_path: '',
      id: 1,
      activities: {
        likes: 2,
        comments: 10,
      },
    },
    {
      image_path: '',
      id: 2,
      activities: {
        likes: 2,
        comments: 10,
      },
    },
    {
      image_path: '',
      id: 3,
      activities: {
        likes: 2,
        comments: 10,
      },
    },
    {
      image_path: '',
      id: 4,
      activities: {
        likes: 2,
        comments: 10,
      },
    },
  ];

  interface GalleryKeys {
    image_path: string;
    id: number;
    activities: {
      likes: number;
      comments: number;
    };
  }

  const renderPhoto = () => (
    <>
      {listImg.map((item: GalleryKeys, index: number) => {
        const { id = 0, image_path: pathImgs = '', activities } = item;

        return (
          <Grid
            key={`${id}`}
            className={classes.gridItem}
            item
            lg={4}
            md={6}
            sm={6}
            spacing={2}
            style={index >= 0 && index <= 2 ? { paddingTop: '0 !important' } : {}}
            wrap='wrap'
            xl={4}
            xs={12}
          >
            <Photo activities={activities} id={id} pathImg={pathImgs} />
          </Grid>
        );
      })}
    </>
  );

  return (
    <div className={`${classes.root} root`}>
      <Grid container spacing={3}>
        <Grid lg={12} md={12} sm={12} spacing={2} wrap='wrap' xl={12} xs={12}>
          <Typography className={classes.titleSuggestion} component='h4' variant='h4'>
            Đề xuất
          </Typography>
        </Grid>
        {renderPhoto()}
        <Grid className={classes.btn} lg={12} md={12} sm={12} spacing={2} xs={12}>
          <Button
            className={classes.nextBtn}
            // endIcon={loading ? <CircularProgress /> : null}
            // onClick={() => handleClick('next')}
            variant='contained'
          >
            <Typography className={classes.textBtn} component='h5' variant='h5'>
              Xem thêm
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default SuggestionComponent;
