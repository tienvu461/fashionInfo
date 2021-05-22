/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Button, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getPhotoSuggestAction } from 'src/features/Photo/photoAction';
import Photo from '../../../Photo';
import useStyles from './useStyles';

interface SuggestionProps {
  photoSuggestionList: Array<any>;
  dataPhoto: Record<string, string>;
  paramsId: string;
}

function SuggestionComponent(props: SuggestionProps): JSX.Element {
  const { photoSuggestionList, dataPhoto, paramsId } = props;
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const [listImg, setListImg] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  interface GalleryKeys {
    image_path: string;
    id: number;
    activities: {
      likes: number;
      comments: number;
    };
  }
  useEffect(() => {
    setListImg(photoSuggestionList);
  }, [photoSuggestionList]);

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
            spacing={2}
            style={index >= 0 && index <= 2 ? { paddingTop: '0 !important' } : {}}
            wrap='wrap'
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
      const nextNum = nextPage.split('suggest?page=').pop();
      const formatNum = nextNum?.replace(`&photo_id=${paramsId}`, '');

      await dispatch(getPhotoSuggestAction(+`${formatNum}`, paramsId)).then((data) => {
        const { results = [] } = data;
        results.forEach((item) => newListImg.push(item));
        setLoading(false);
      });
    } else {
      const exist = previousPage.includes('suggest?page=');
      let prevNum: any = '';

      if (exist) {
        prevNum = previousPage.split('suggest?page=').pop();
        prevNum = prevNum?.replace(`&photo_id=${paramsId}`, '');
      }
      await dispatch(getPhotoSuggestAction(+`${prevNum}`, paramsId));
    }

    // setListImg(newListImg);
  };

  return (
    <div className={`${classes.root} root`}>
      <Grid lg={12} md={12} sm={12} wrap='wrap' xl={12} xs={12}>
        <Typography className={classes.titleSuggestion} component='h4' variant='h4'>
          Đề xuất
        </Typography>
      </Grid>
      <Grid container spacing={4}>
        {renderPhoto()}
        <Grid className={classes.btn} lg={12} md={12} sm={12} spacing={2} xs={12}>
          <>
            {dataPhoto.next ? (
              <Button
                className={classes.nextBtn}
                endIcon={loading ? <CircularProgress /> : null}
                onClick={() => handleClick('next')}
                variant='contained'
              >
                <Typography className={classes.textBtn} component='h5' variant='h5'>
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

export default SuggestionComponent;