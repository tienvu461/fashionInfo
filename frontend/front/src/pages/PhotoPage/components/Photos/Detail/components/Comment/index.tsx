import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Grid, Paper, Card, CardActionArea, CardMedia, Typography, Divider, CircularProgress } from '@material-ui/core';
import useStyles from './useStyles';

function CommentComponent() {
  const classes = useStyles();

  return <div className={classes.root}>Comments</div>;
}

export default CommentComponent;
