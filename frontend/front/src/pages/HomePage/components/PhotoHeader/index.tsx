import React from 'react';
import { Grid, Typography, useMediaQuery } from '@material-ui/core';

import useStyles from './useStyles';

function PhotoHeader(): JSX.Element {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:600px)');

  return (
    <Grid className={classes.root} container>
      <Grid
        className={classes.leftSectionMatches}
        item
        sm={matches ? 12 : 6}
        xs={12}
      >
        <Typography className={classes.headline} component='h1' variant='h1'>
          Khu vực dành cho Headline
        </Typography>
      </Grid>
      {matches ? (
        <Grid className={classes.footerSectionMatches} item sm={12} xs={12}>
          <Typography className={classes.subline} component='h6' variant='h6'>
            Sites of the day Previous Winners
          </Typography>
        </Grid>
      ) : null}
      <Grid
        className={classes.rightSection}
        item
        sm={6}
        style={matches ? { marginBottom: '80px' } : {}}
        xs={12}
      />
      <Grid
        className={classes.footerSection}
        item
        sm={12}
        style={matches ? { display: 'none' } : {}}
        xs={12}
      >
        <Typography className={classes.subline} component='h6' variant='h6'>
          Sites of the day Previous Winners
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PhotoHeader;
