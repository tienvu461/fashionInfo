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
    dispatch(listPhotoAction());
  }, [dispatch]);

  const gallery = useSelector(
    (state: RootState) => state.photo.photoList.listPhoto
  );
  const dataPhoto = useSelector(
    (state: RootState) => state.photo.photoList.dataOrigin
  );

  const renderPhoto = () => (
    <>
      {gallery.map((item: any, index: number) => {
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

  const handleClickNext = () => {
    console.log(dataPhoto);
  };

  return (
    <div className={`${classes.root} root`}>
      <Grid container spacing={3}>
        {renderPhoto()}
        <Grid item lg={12} md={12} sm={12} spacing={2}>
          <Button className={classes.nextBtn} onClick={handleClickNext}>
            <Typography className={classes.textBtn} component='h5' variant='h5'>
              Xem thêm
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Photos;
