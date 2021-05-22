import React from 'react';
import { Divider, Grid } from '@material-ui/core';
import Comment from './components/Comment';
import useStyles from './useStyles';
import Reporter from './components/Reporter';

function CommentComponent(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container>
        <Grid lg={8} md={8} sm={8} spacing={2} wrap='wrap' xl={12} xs={12}>
          <Comment />
        </Grid>
        <Grid lg={4} md={4} sm={4} spacing={2} wrap='wrap' xl={12} xs={12}>
          <Reporter />
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
}

export default CommentComponent;
