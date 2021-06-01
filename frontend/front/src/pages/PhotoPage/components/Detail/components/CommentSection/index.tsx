/* eslint-disable import/no-unresolved */
import React from 'react';
import { Divider, Grid, useMediaQuery } from '@material-ui/core';
import CommentLayout from 'src/components/CommentLayout';
import useStyles from './useStyles';
import Reporter from './components/Reporter';
import Comments from './components/Comments';

interface CommentComponentProps {
  paramsId: string;
}

function CommentComponent(props: CommentComponentProps): JSX.Element {
  const { paramsId } = props;
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:600px)');

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container>
        {matches ? (
          <Grid item lg={4} md={4} sm={4} xl={6} xs={12}>
            <Reporter />
          </Grid>
        ) : null}
        <Grid item lg={8} md={8} sm={8} xl={6} xs={12}>
          <CommentLayout paramsId={paramsId}>
            <Comments />
          </CommentLayout>
        </Grid>
        {!matches ? (
          <Grid item lg={4} md={4} sm={4} xl={6} xs={12}>
            <Reporter />
          </Grid>
        ) : null}
      </Grid>
      <Divider />
    </div>
  );
}

export default CommentComponent;
