/* eslint-disable import/no-unresolved */
import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Timeline,
} from '@material-ui/lab';
import useStyles from './useStyles';
import CommentParrent from './CommentParrent';

function TreeView(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Timeline className={classes.rootTimeline}>
        <CommentParrent />
      </Timeline>
    </Grid>
  );
}

export default TreeView;
