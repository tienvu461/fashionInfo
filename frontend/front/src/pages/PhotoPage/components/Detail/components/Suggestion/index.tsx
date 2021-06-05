/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Typography, RootRef, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getPhotoSuggestAction } from 'src/features/Photo/photoAction';
import Photo from 'src/components/Photo';
import { RootState } from 'src/store/store';

import useStyles from './useStyles';
import './_suggestion.scss';

interface SuggestionProps {
  paramsId: string;
}

function SuggestionComponent(props: SuggestionProps): JSX.Element {
  const { paramsId } = props;
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const valueRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);

  const dataPhoto = useSelector((state: RootState) => state.photo.photoSuggestionList.dataOrigin);
  const listPhoto = useSelector((state: RootState) => state.photo.photoSuggestionList.listPhoto);
  const [listImg, setListImg] = useState<Array<any>>(listPhoto);

  useEffect(() => {
    setLoading(true);
    setInitialLoading(true);

    // fetch data suggestion photo list
    dispatch(getPhotoSuggestAction(1, paramsId)).then((data) => {
      const { results = [] } = data;
      setListImg(results);
      setInitialLoading(false);
      setLoading(false);
    });
  }, [dispatch, paramsId]);

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
      await dispatch(getPhotoSuggestAction(+nextPage, paramsId)).then((data) => {
        const { results = [] } = data;
        results.forEach((item) => newListImg.push(item));
        setLoading(false);
        setTimeout(() => {
          window.scrollBy({
            behavior: 'smooth',
            top: 720,
          });
        }, 200);
      });
    } else {
      await dispatch(getPhotoSuggestAction(+previousPage, paramsId));
    }

    setListImg(newListImg);
  };

  const loadingPhoto = () => (
    <>
      {[1, 2, 3].map((id) => (
        <Grid key={id} item lg={4} md={6} sm={6} xl={4} xs={12}>
          <Box marginRight={2} my={5} width='100%'>
            <Skeleton animation='wave' height={250} variant='rect' width='100%' />
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
      <div className='titleSuggestion'>
        <Typography className={classes.titleSuggestion} component='h4' variant='h4'>
          Đề xuất
        </Typography>
      </div>
      <div className='root'>
        <Grid container className='container'>
          {initialLoading ? (
            <>{loadingPhoto()}</>
          ) : (
            <>
              {renderPhoto()}
              <Grid className={classes.btn} item lg={12} md={12} sm={12} xs={12}>
                <>
                  {dataPhoto.next ? (
                    <Button
                      className={classes.nextBtn}
                      endIcon={loading ? <CircularProgress /> : null}
                      onClick={() => handleClick('next')}
                      variant='contained'
                    >
                      <Typography className={classes.textBtn} component='h4' variant='h4'>
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

export default SuggestionComponent;
