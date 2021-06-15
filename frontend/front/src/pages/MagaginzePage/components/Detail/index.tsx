import React from 'react';
import { Grid } from '@material-ui/core';

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
    return (
      <div className='magazine-detail'>
        <Grid container>
          <Grid className='banner' item xs={12} sm={12} md={12} lg={12} xl={12} />
        </Grid>
        <div className='article'>
          <div className='magazine-article'>
            <MagazineArticle />
          </div>
          <div className='magazine-comment'>
            <MagazineComment paramsId={id} />
          </div>
          <div className='magazine-suggestion'>
            <MagazineSuggestion />
          </div>
        </div>
      </div>
    );
}

export default DetailMagazine;
