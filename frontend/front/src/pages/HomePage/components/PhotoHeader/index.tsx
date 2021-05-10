import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import useStyles from './useStyles';

function PhotoHeader(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.leftSection} item sm={6} xs={12}>
        <Typography className={classes.headline} component='h1' variant='h1'>
          Khu vực dành cho Headline
        </Typography>
      </Grid>
      <Grid className={classes.rightSection} item sm={6} xs={12} />
      <Grid className={classes.footerSection} item sm={12} xs={12}>
        <Typography className={classes.subline} component='h6' variant='h6'>
          Sites of the day Previous Winners
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PhotoHeader;
