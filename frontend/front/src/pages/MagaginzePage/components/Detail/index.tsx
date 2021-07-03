/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress, RootRef } from '@material-ui/core';
import { fetchDetailMagazineAction } from 'src/features/Magazine/MagazineAction';

import MagazineArticle from './components/MagazineArticle';
import MagazineComment from './components/MagazineComment';
import MagazineSuggestion from './components/MagazineSuggestion';
import { RootState } from 'src/store/store';
import { loadingResponse } from 'src/features/Loading/LoadingSlice';

import './_magazine_detail.scss';

interface DetailProps {
  match: {
    params: {
      id: string;
    };
  };
}

const DetailMagazine: React.FunctionComponent<DetailProps> = (props) => {
  const { match: { params: { id = '' } = {} } = {} } = props;

  const valueRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<any>();
  const magazineComment = useSelector((state: RootState) => state.magazine.magazineComment);
  const loading = useSelector((state: RootState) => state.loading.isLoading);

  useEffect(() => {
    dispatch(loadingResponse(true));
    // fetch data detail information
    dispatch(fetchDetailMagazineAction(+id)).then((res) => {
      const { status = '' } = res;
      if (status === 200) {
        dispatch(loadingResponse(false));
         window.scrollTo({
           top: 0,
           left: 0,
           behavior: 'smooth',
         });
      }
    });
  }, [dispatch, id]);

  // Fecch detail page again after comment to get the newest comment list
  useEffect(() => {
    if (magazineComment.cmt_id) {
      dispatch(fetchDetailMagazineAction(+magazineComment.magazine_id));
    }
  }, [dispatch, magazineComment, magazineComment.cmt_id]);

  if (loading) {
    return (
      <div className='loading'>
        <CircularProgress className='loading-icon' />
      </div>
    );
  }

  const handleScrollToComment = () => {
    valueRef?.current?.scrollIntoView();
  };

  return (
    <div className='magazine-detail'>
      <Grid container>
        <Grid className='banner' item xs={12} sm={12} md={12} lg={12} xl={12} />
      </Grid>
      <div className='article-section'>
        <div className='magazine-article'>
          <MagazineArticle handleScrollToComment={handleScrollToComment} />
        </div>
        <div className='magazine-comment'>
          <RootRef rootRef={valueRef}>
            <MagazineComment paramsId={id} />
          </RootRef>
        </div>
        <div className='magazine-suggestion'>
          <MagazineSuggestion paramsId={id} />
        </div>
      </div>
    </div>
  );
};

export default DetailMagazine;
