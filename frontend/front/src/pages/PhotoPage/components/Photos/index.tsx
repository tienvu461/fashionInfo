/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, RootRef } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { listPhotoAction } from 'src/features/Photo/photoAction';
import BtnViewMore from 'src/components/Buttons/ButtonViewMore';
import { RootState } from 'src/store/store';
import Photo from 'src/components/Photo';

import useStyles from './useStyles';
import './_photos.scss';

function Photos(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const valueRef = useRef<HTMLInputElement>(null);

  const [listImg, setListImg] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);

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

  const renderPhoto = () => (
    <>
      {listImg.map((item, index: number) => {
        const { id = 0, image_path: pathImgs = '', activities, user_likes: userLikes = [] } = item;

        return (
          <RootRef rootRef={valueRef} key={`${id}`}>
            <div className='gridItem'>
              <Photo activities={activities} id={id} pathImg={pathImgs} userLikes={userLikes} />
            </div>
          </RootRef>
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

        valueRef?.current?.scrollIntoView({ behavior: 'smooth' });
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
        <div
          className={`gridItem ${classes.loadingPhoto}`}
          key={id}
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
        </div>
      ))}
    </>
  );

  return (
    <div className={`${classes.root} photoRoot`}>
      <Grid className='container' container>
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
                  <BtnViewMore handleClick={handleClick} loading={loading} />
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
