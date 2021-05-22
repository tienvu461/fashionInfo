import React from 'react';
import { Divider, Grid, useMediaQuery } from '@material-ui/core';
import Comment from './components/Comment';
import useStyles from './useStyles';
import Reporter from './components/Reporter';

function CommentComponent(): JSX.Element {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:600px)');

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container>
        {matches ? (
          <Grid lg={4} md={4} sm={4} spacing={2} wrap='wrap' xl={12} xs={12}>
            <Reporter />
          </Grid>
        ) : null}
        <Grid lg={8} md={8} sm={8} spacing={2} wrap='wrap' xl={12} xs={12}>
          <Comment />
        </Grid>
        {!matches ? (
          <Grid lg={4} md={4} sm={4} spacing={2} wrap='wrap' xl={12} xs={12}>
            <Reporter />
          </Grid>
        ) : null}
      </Grid>
      <Divider />
    </div>
  );
}

export default CommentComponent;
