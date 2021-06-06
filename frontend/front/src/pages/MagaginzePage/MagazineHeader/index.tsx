/* eslint-disable import/no-unresolved */
import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import banner from 'src/assets/images/magazine/banner.png';
import useStyles from './useStyles';

import './_magazineHeader.scss';

function MagazineHeader(): JSX.Element {
    const classes = useStyles();

    return (
      <div className='magazineHeader'>
        <Grid container>
          <Grid className='banner' item xs={12} sm={12} md={12} lg={12} xl={12}>
            <img className='banner-img' src={banner} alt='banner' />
          </Grid>
        </Grid>
        <div className='magazineContent'>
          <Typography className={classes.titleHeadLine} variant='h2' component='h2'>
            Khu vực Headline
          </Typography>
        </div>
      </div>
    );
}

export default MagazineHeader;
