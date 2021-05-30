/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { listPhotoAction } from 'src/features/Photo/photoAction';
import { RootState } from 'src/store/store';
import Photo from 'src/components/Photo';

import useStyles from './useStyles';

function Photos(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const [listImg, setListImg] = useState<Array<any>>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // initial fetch data and set gallery to state once time
  useEffect(() => {
    setLoading(true);
    setInitialLoading(true);
    dispatch(listPhotoAction(1)).then((data) => {
      const { results = [] } = data;
      setListImg(results);
      setInitialLoading(false);
      setLoading(false);
    });
  }, [dispatch]);

  const dataPhoto = useSelector(
    (state: RootState) => state.photo.photoList.dataOrigin
  );
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
            style={
              index >= 0 && index <= 2 ? { paddingTop: '0 !important' } : {}
            }
            xl={4}
            xs={12}
          >
            <Photo activities={activities} id={id} pathImg={pathImgs} />
          </Grid>
        );
      })}
    </>
  );

  const handleClick = async (key: string) => {
    const { next: nextPage = '', previous: previousPage = '' } = dataPhoto;
    const newListImg = [...listImg];
    setLoading(true);

    if (key === 'next') {
      const nextNum = nextPage.split('?page=').pop();
      await dispatch(listPhotoAction(+`${nextNum}`)).then((data) => {
        const { results = [] } = data;
        results.forEach((item) => newListImg.push(item));
        setLoading(false);

        setTimeout(() => {
          window.scrollBy({
            behavior: 'smooth',
            top: document.body.scrollHeight - 2720,
          });
        }, 200);
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

  const loadingPhoto = () => (
    <>
      {[1, 2, 3].map((id) => (
        <Grid
          key={id}
          className={classes.loadingPhoto}
          item
          lg={4}
          md={6}
          sm={6}
          xl={4}
          xs={12}
        >
          <Box marginRight={2} my={5} width='100%'>
            <Skeleton
              animation='wave'
              height={250}
              variant='rect'
              width='100%'
            />
            <Box pt={0.5}>
              <Skeleton variant='rect' />
            </Box>
            <Box pt={0.5}>
              <Skeleton variant='rect' width='60%' />
            </Box>
          </Box>
        </Grid>
      ))}
    </>
  );

  return (
    <div className={`${classes.root} root`}>
      <Grid container spacing={3}>
        {initialLoading ? (
          <>{loadingPhoto()}</>
        ) : (
          <>
            {renderPhoto()}
            <Grid
              className={classes.btn}
              item
              lg={12}
              md={12}
              sm={12}
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
