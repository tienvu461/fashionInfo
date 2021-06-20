/* eslint-disable import/no-unresolved */
import React from 'react';
import { Divider, Grid, useMediaQuery } from '@material-ui/core';
import CommentLayout from 'src/components/CommentLayout';
import Comments from 'src/components/Comments';
import useStyles from './useStyles';
import Reporter from './components/Reporter';

interface PhotoCommentProps {
  paramsId: string;
}

const PhotoComment: React.FunctionComponent<PhotoCommentProps> = (props) => {
  const { paramsId } = props;
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container>
        {!matches ? (
          <Grid item lg={4} md={4} sm={4} xl={6} xs={12}>
            <Reporter />
          </Grid>
        ) : null}
        <Grid item lg={8} md={8} sm={8} xl={6} xs={12}>
          <CommentLayout paramsId={paramsId}>
            <Comments keyItem='photo' />
          </CommentLayout>
        </Grid>
        {matches ? (
          <Grid item lg={4} md={4} sm={4} xl={6} xs={12}>
            <Reporter />
          </Grid>
        ) : null}
      </Grid>
      <Divider />
    </div>
  );
};

export default PhotoComment;
