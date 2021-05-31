/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useMemo, useState, useRef } from 'react';
import { Grid, Avatar, Paper, Typography, TextField } from '@material-ui/core';
import { Timeline, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@material-ui/lab';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import Ava1 from 'src/assets/images/menAva.jpg';
import Ava3 from 'src/assets/images/ava3.svg';
import { commentPhotoAction } from 'src/features/Photo/photoAction';

import useStyles from './useStyles';
import CommentParrent from './CommentParrent';

function Comments(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const [textArea, setTextArea] = useState<string>('');
  const valueRef = useRef<HTMLInputElement>();
  const comments = useSelector((state: RootState) => state.photo.photoDetail.comments);
  const photoId = useSelector((state: RootState) => state.photo.photoDetail.id);
  const loginStatus = useSelector((state: any) => state.login.loginResponse.status);
  const user = useSelector((state: any) => state.login.loginResponse.userID);

  const listComments = useMemo(
    () => (
      <>
        {isEmpty(comments) ? null : (
          <>
            {comments.map((item: any, index: number) => {
              const { cmt_id: cmtID = '' } = item;
              return (
                <CommentParrent
                  key={cmtID}
                  cmtProps={{ ...item, avatar: Ava1, cmtLength: comments.length, lastCmt: index }}
                  currentUser={user}
                />
              );
            })}
          </>
        )}
      </>
    ),
    [comments]
  );

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    let newText = '';
    if (text.length <= 255) {
      newText = text;
    } else {
      newText = text.substring(0, 255);
    }
    setTextArea(newText);
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      valueRef.current?.blur();
      const payload: {
        user_id: string;
        photo_id: string | number;
        content: string;
        parent: null;
      } = {
        user_id: user,
        photo_id: photoId,
        content: textArea,
        parent: null,
      };
      dispatch(commentPhotoAction(payload));
      setTextArea('');
    }
  };

  return (
    <Grid className={classes.root}>
      <Timeline className={classes.rootTimeline}>{listComments}</Timeline>
      {loginStatus ? (
        <Timeline className={classes.rootTimeline}>
          <TimelineItem className={classes.timeline}>
            <TimelineSeparator>
              <TimelineDot className={classes.dotAvatar}>
                <Avatar alt='ava' className={classes.avatar} src={Ava3} />
              </TimelineDot>
            </TimelineSeparator>

            <TimelineContent className={classes.content}>
              <Paper className={classes.paper} elevation={3}>
                <Typography className={`${classes.actionName} ${classes.textStyle}`} component='h6' variant='h6'>
                  {`User ${user}`}
                </Typography>
                <TextField
                  className={classes.textArea}
                  multiline
                  rows={1}
                  rowsMax={4}
                  aria-label='maximum height'
                  placeholder='Viết bình luận...'
                  InputProps={{
                    classes: { input: classes.inputTextArea },
                  }}
                  onChange={onTextFieldChange}
                  onKeyPress={onKeyPress}
                  inputRef={valueRef}
                  value={textArea}
                />
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      ) : null}
    </Grid>
  );
}

export default Comments;
