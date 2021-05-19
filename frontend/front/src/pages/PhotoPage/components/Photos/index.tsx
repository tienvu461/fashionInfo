/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line object-curly-newline
import { Button, Grid, Typography, Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './useStyles';
import Photo from './Photo';
import { listPhotoAction } from '../../../../features/Photo/photoAction';
import { RootState } from '../../../../store/store';

function Photos(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const [listImg, setListImg] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  // initial fetch data and set gallery to state once time
  useEffect(() => {
    setLoading(true);
    dispatch(listPhotoAction(1)).then((data) => {
      const { results = [] } = data;
      setListImg(results);
      setLoading(false);
    });
  }, [dispatch]);

  const dataPhoto = useSelector(
    (state: RootState) => state.photo.photoList.dataOrigin
  );

  interface GalleryKeys {
    image_path: string;
    id: number;
  }

  const renderPhoto = () => (
    <>
      {listImg.map((item: GalleryKeys, index: number) => {
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

  const handleClick = async (key: string) => {
    const { next: nextPage = '', previous: previousPage = '' } = dataPhoto;
    const newListImg = [...listImg];
    setLoading(true);
    setOpen(true);

    if (key === 'next') {
      const nextNum = nextPage.split('?page=').pop();
      await dispatch(listPhotoAction(+`${nextNum}`)).then((data) => {
        const { results = [] } = data;
        results.forEach((item) => newListImg.push(item));
        setLoading(false);
        setOpen(false);
      });
    } else {
      const exist = previousPage.includes('?page=');
      let prevNum = 1;

      if (exist) {
        prevNum = +`${previousPage.split('?page=').pop()}`;
      }
      dispatch(listPhotoAction(+`${prevNum}`));
    }

    setListImg(newListImg);
  };

  return (
    <div className={`${classes.root} root`}>
      <Backdrop className={classes.backDrop} open={open}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Grid container spacing={3}>
        {loading ? (
          <div className={classes.skeleton}>
            {[100, 90, 80, 70, 60].map((width) => (
              <Skeleton
                animation='wave'
                height={10}
                style={{ marginBottom: '20px' }}
                variant='rect'
                width={`${width}%`}
              />
            ))}
          </div>
        ) : (
          <>
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
                {dataPhoto.next ? (
                  <Button
                    className={classes.nextBtn}
                    endIcon={loading ? <CircularProgress /> : null}
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
          </>
        )}
      </Grid>
    </div>
  );
}

export default Photos;
