/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, CircularProgress, RootRef } from '@material-ui/core';
import { fetchDetailMagazineAction } from 'src/features/Magazine/MagazineAction';

import MagazineArticle from './components/MagazineArticle';
import MagazineComment from './components/MagazineComment';
import MagazineSuggestion from './components/MagazineSuggestion';
import { RootState } from 'src/store/store';

import './_magazine_detail.scss';

interface DetailProps {
  match: {
    params: {
      id: string;
    };
  };
}

function DetailMagazine(props: DetailProps): JSX.Element {
  const { match: { params: { id = '' } = {} } = {} } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const valueRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<any>();
  const magazineComment = useSelector((state: RootState) => state.magazine.magazineComment);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    // fetch data detail information
    dispatch(fetchDetailMagazineAction(+id)).then((res) => {
      const { status = '' } = res;
      if (status === 200) {
        setLoading(false);
      }
    });
  }, [dispatch, id]);

  // Fecch detail page again after comment to get the newest comment list
  useEffect(() => {
    if (magazineComment.cmt_id) {
      dispatch(fetchDetailMagazineAction(+magazineComment.news_id)).then((res) => {
        const { status = '' } = res;
        if (status === 200) {
          setLoading(false);
        }
      });
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
    valueRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
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
}

export default DetailMagazine;
