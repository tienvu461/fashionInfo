/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import { fetchDetailMagazineAction } from 'src/features/Magazine/MagazineAction';

import MagazineArticle from './components/MagazineArticle';
import MagazineComment from './components/MagazineComment';
import MagazineSuggestion from './components/MagazineSuggestion';

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
    // const [like, setLike] = useState<number>(0);
    const dispatch = useDispatch<any>();

    useEffect(() => {
      // fetch data detail information
      dispatch(fetchDetailMagazineAction(+id)).then((res) => {
        const { status = '', data = {} } = res;
        if (status === 200) {
          setLoading(false);
          console.log(data);
          // setLike(likes);
        }
      });
    }, [dispatch, id]);

    if (loading) {
      return (
        <div className='loading'>
          <CircularProgress className='loading-icon' />
        </div>
      );
    }

    return (
      <div className='magazine-detail'>
        <Grid container>
          <Grid className='banner' item xs={12} sm={12} md={12} lg={12} xl={12} />
        </Grid>
        <div className='article-section'>
          <div className='magazine-article'>
            <MagazineArticle />
          </div>
          <div className='magazine-comment'>
            <MagazineComment paramsId={id} />
          </div>
          <div className='magazine-suggestion'>
            <MagazineSuggestion paramsId={id} />
          </div>
        </div>
      </div>
    );
}

export default DetailMagazine;
