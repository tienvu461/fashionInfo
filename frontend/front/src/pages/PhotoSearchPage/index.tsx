/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState, useRef } from 'react';
import { Grid, Typography, Box, RootRef } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchPhotoAction } from 'src/features/Search/searchAction';
import Photo from 'src/components/Photo';
import BtnViewMore from 'src/components/Buttons/ButtonViewMore';
import { RootState } from 'src/store/store';

import useStyles from '../PhotoPage/components/Photos/useStyles';
import '../PhotoPage/components/Photos/_photos.scss';

function PhotoSearchPage(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const valueRef = useRef<HTMLInputElement>(null);
  const [listImg, setListImg] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const location = useLocation();

  const getUrlCurrent = location.pathname;
  const splitText = getUrlCurrent.split('/');
  const valueSearch = splitText[splitText.length - 1];

  // initial fetch data and set gallery to state once time
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setLoading(true);
    setInitialLoading(true);
    setListImg([]);
    dispatch(searchPhotoAction(1, `${valueSearch}`)).then((data) => {
      const { results = [] } = data;
      setListImg(results);
      setInitialLoading(false);
      setLoading(false);
    });
  }, [dispatch, valueSearch]);

  const dataPhoto = useSelector(
    (state: any) => state.searchTag.dataSearch.dataOrigin
  );
  const textSearch = useSelector((state: RootState) => state.searchTag.textSearch);

  const renderPhoto = () => (
    <>
      {listImg.map((item) => {
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
  const { results: photoList = [] } = dataPhoto;
  const currentPhotoList = [...photoList];

  const handleSearchTagNotFound = () => {
    if (dataPhoto.count === 0) {
      return <Typography className={`${classes.textSearch} textSearch`}>Tag is not found</Typography>;
    }
    return null;
  };

  // test(currentPhotoList);
  const handleClick = async (key: string) => {
    const { next: nextPage = '', previous: previousPage = '' } = dataPhoto;
    const getStringSearch = nextPage.split('?page=').pop();
    const nextNum = getStringSearch.split('&search_text=').shift();

    if (key === 'next') {
      await dispatch(searchPhotoAction(nextNum, textSearch)).then((data) => {
        const { results = [] } = data;
        results.forEach((item) => currentPhotoList.push(item));
        setLoading(false);

        valueRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      });
    } else {
      const exist = previousPage.includes('?page=');
      let prevNum = 1;

      if (exist) {
        prevNum = +`${previousPage.split('?page=').pop()}`;
      }
      dispatch(searchPhotoAction(+`${prevNum}`, `${textSearch}`));
    }
    setListImg(currentPhotoList);
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
    <>
      <div style={{ padding: '50px 0px', backgroundColor: '#EEEEEE' }} />
      <div className={`${classes.root} photoRoot`}>
        <Grid className='container' container>
          <Typography className={`${classes.textSearch} textSearch`}>{`#${textSearch}`}</Typography>
          {handleSearchTagNotFound()}
        </Grid>
      </div>
      <div className={`${classes.root} photoRoot`}>
        <Grid className='container' container>
          {initialLoading ? (
            <>{loadingPhoto()}</>
          ) : (
            <>
              {renderPhoto()}
              <Grid className={classes.btn} item lg={12} md={12} sm={12} xs={12}>
                <>{dataPhoto.next ? <BtnViewMore handleClick={handleClick} loading={loading} /> : null}</>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </>
  );
}
export default PhotoSearchPage;
