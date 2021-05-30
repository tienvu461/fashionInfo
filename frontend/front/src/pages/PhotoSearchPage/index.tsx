/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography, Box } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { searchAction } from 'src/features/Search/searchAction';
import { RootState } from 'src/store/store';
import Photo from 'src/components/Photo';

import useStyles from './useStyles';

function PhotoSearchPage(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const [listImg, setListImg] = useState<Array<any>>([]);
  const getUrlCurrent = window.location.pathname;
  // get text search in url
  const textSearch = getUrlCurrent.slice(14);

  // initial fetch data and set gallery to state once time
  useEffect(() => {
    // setLoading(true);
    // setInitialLoading(true);
    dispatch(searchAction(1, `${textSearch}`)).then((data) => {
      const { results = [] } = data;
      setListImg(results);
      // setInitialLoading(false);
      // setLoading(false);
    });
  }, [dispatch]);

  interface GalleryKeys {
    image_path: string;
    id: number;
    activities: {
      likes: number;
      comments: number;
    };
  }

  const dataPhoto = useSelector(
    (state: any) => state.searchTag.dataSearch.dataOrigin
  );
  const { results: photoList = [] } = dataPhoto;
  console.log("mang ban dau", photoList);
  const arrayPhoto = [...photoList];
  const handleClick = async (key: string) => {
    const { next: nextPage = '', previous: previousPage = '' } = dataPhoto;
    const getStringSearch = nextPage.split('?page=').pop();
    const getNum_textSearch = getStringSearch.split("&search_text=");
    console.log("QQQ", getNum_textSearch[0], getNum_textSearch[1]);
    await dispatch(searchAction(getNum_textSearch[0], getNum_textSearch[1])).then((data) => {
        const { results = [] } = data;
        console.log("data moi", results);
        results.forEach((item) => arrayPhoto.push(item));
        console.log("mang moi", arrayPhoto);
        // setLoading(false);

        setTimeout(() => {
          window.scrollBy({
            behavior: 'smooth',
            top: document.body.scrollHeight - 2720,
          });
        }, 200);
      });
      // setListImg(arrayPhoto);
  };

const renderPhoto = () => (
  <>
    {arrayPhoto.map((item: GalleryKeys, index: number) => {
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

  return (
    <div className={`${classes.root} root`}>
      <Grid container spacing={3}>
        {renderPhoto()}
      </Grid>
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
              // endIcon={loading ? <CircularProgress /> : null}
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
    </div>
  );
}
export default PhotoSearchPage;
