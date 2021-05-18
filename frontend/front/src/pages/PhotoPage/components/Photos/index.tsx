/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './useStyles';
import Photo from './Photo';
import { listPhotoAction } from '../../../../features/Photo/photoAction';
import { RootState } from '../../../../store/store';

function Photos(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listPhotoAction(1));
  }, [dispatch]);

  const gallery = useSelector(
    (state: RootState) => state.photo.photoList.listPhoto
  );
  const dataPhoto = useSelector(
    (state: RootState) => state.photo.photoList.dataOrigin
  );

  interface GalleryKeys {
    image_path: string;
    id: number;
  }

  const renderPhoto = () => (
    <>
      {gallery.map((item: GalleryKeys, index: number) => {
        const { id = 0, image_path: pathImgs = '' } = item;

        return (
          <Grid
            key={`${id}`}
            className={classes.gridItem}
            item
            lg={4}
            md={6}
            sm={6}
            spacing={2}
            style={
              index >= 0 && index <= 2 ? { paddingTop: '0 !important' } : {}
            }
            wrap='wrap'
            xl={4}
            xs={12}
          >
            <Photo pathImg={pathImgs} />
          </Grid>
        );
      })}
    </>
  );

  const handleClick = (key: string) => {
    const { next: nextPage = '', previous: previousPage = '' } = dataPhoto;

    if (key === 'next') {
      const nextNum = nextPage.split('?page=').pop();
      dispatch(listPhotoAction(+`${nextNum}`));
    } else {
      const exist = previousPage.includes('?page=');
      let prevNum = 1;

      if (exist) {
        prevNum = +`${previousPage.split('?page=').pop()}`;
      }
      dispatch(listPhotoAction(+`${prevNum}`));
    }
  };

  return (
    <div className={`${classes.root} root`}>
      <Grid container spacing={3}>
        {renderPhoto()}
        <Grid
          className={classes.btn}
          lg={12}
          md={12}
          sm={12}
          spacing={2}
          xs={12}
        >
          <>
            {dataPhoto.previous ? (
              <Button
                className={classes.nextBtn}
                onClick={() => handleClick('previous')}
                variant='contained'
              >
                <Typography
                  className={classes.textBtn}
                  component='h5'
                  variant='h5'
                >
                  Trang trước
                </Typography>
              </Button>
            ) : null}
          </>

          <>
            {dataPhoto.next ? (
              <Button
                className={classes.nextBtn}
                onClick={() => handleClick('next')}
                variant='contained'
              >
                <Typography
                  className={classes.textBtn}
                  component='h5'
                  variant='h5'
                >
                  Xem thêm
                </Typography>
              </Button>
            ) : null}
          </>
        </Grid>
      </Grid>
    </div>
  );
}

export default Photos;
