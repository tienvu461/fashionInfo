import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
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

  return (
    <div className={`${classes.root} root`}>
      <Grid container spacing={3}>
        {renderPhoto()}
      </Grid>
    </div>
  );
}

export default Photos;
