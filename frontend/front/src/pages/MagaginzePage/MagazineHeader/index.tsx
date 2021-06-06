/* eslint-disable import/no-unresolved */
import React from 'react';
import { Grid } from '@material-ui/core';
import banner from 'src/assets/images/magazine/banner.png';

import './_magazineHeader.scss';

function MagazineHeader(): JSX.Element {
    return (
      <div className='magazineHeader'>
        <Grid container>
          <Grid className='banner' item xs={12} sm={12} md={12} lg={12} xl={12}>
            <img className='banner-img' src={banner} alt='banner' />
          </Grid>
        </Grid>
      </div>
    );
}

export default MagazineHeader;
