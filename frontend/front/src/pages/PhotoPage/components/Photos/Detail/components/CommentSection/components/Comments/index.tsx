/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { Timeline } from '@material-ui/lab';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import Ava1 from 'src/assets/images/menAva.jpg';

import useStyles from './useStyles';
import CommentParrent from './CommentParrent';

function Comments(): JSX.Element {
  const classes = useStyles();
  const comments = useSelector((state: RootState) => state.photo.photoDetail.comments);

  const listComments = useMemo(
    () => (
      <>
        {isEmpty(comments) ? (
          null
      ) : (
        <>
          {comments.map((item: any, index: number) => {
            const { cmt_id: cmtID = '' } = item;
            return <CommentParrent key={cmtID} cmtProps={{ ...item, avatar: Ava1, cmtLength: comments.length, lastCmt: index }} />;
          })}
        </>
      )}
      </>
    ), [comments]
  );

  return (
    <Grid className={classes.root}>
      <Timeline className={classes.rootTimeline}>{listComments}</Timeline>
    </Grid>
  );
}

export default Comments;
