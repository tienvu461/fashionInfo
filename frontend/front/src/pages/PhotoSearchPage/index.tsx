/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState, useRef } from 'react';
import { Button, Grid, Typography, Box, RootRef } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction } from 'src/features/Search/searchAction';
import Photo from 'src/components/Photo';

import useStyles from '../PhotoPage/components/Photos/useStyles';
import '../PhotoPage/components/Photos/_photos.scss';

function PhotoSearchPage(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const valueRef = useRef<HTMLInputElement>(null);
  const [listImg, setListImg] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const getUrlCurrent = window.location.pathname;
  // get text search in url
  const textSearch = getUrlCurrent.slice(14);
  // replace % to '' in textSearch
  const textTag = textSearch.replace(/%20/g, ' #');

  // initial fetch data and set gallery to state once time
  useEffect(() => {
    setLoading(true);
    setInitialLoading(true);
    setListImg([]);
    dispatch(searchAction(1, `${textSearch}`)).then((data) => {
      const { results = [] } = data;
      setListImg(results);
      setInitialLoading(false);
      setLoading(false);
    });
  }, [dispatch, textSearch]);

  const dataPhoto = useSelector(
    (state: any) => state.searchTag.dataSearch.dataOrigin
  );

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

  const handleSearchTagNotFound = (array) => {
    if (!array.length) {
      return (
        <Typography className={`${classes.textSearch} textSearch`}>Tag is not found</Typography>
      );
    }
    return null;
  };
  // test(currentPhotoList);
  const handleClick = async (key: string) => {
    const { next: nextPage = '', previous: previousPage = '' } = dataPhoto;
    const getStringSearch = nextPage.split('?page=').pop();
    if (key === 'next') {
      const getNum_textSearch = getStringSearch.split('&search_text=');
      await dispatch(searchAction(getNum_textSearch[0], getNum_textSearch[1])).then((data) => {
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
      dispatch(searchAction(+`${prevNum}`, `${textSearch}`));
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
          <Typography className={`${classes.textSearch} textSearch`}>{`#${textTag}`}</Typography>
          {handleSearchTagNotFound(currentPhotoList)}
        </Grid>
      </div>
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
    </>
  );
}
export default PhotoSearchPage;
