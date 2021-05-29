/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useRef, useState } from 'react';
import { Grid, Paper, Typography, Avatar, TextField } from '@material-ui/core';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { commentPhotoAction } from 'src/features/Photo/photoAction';
import Ava2 from 'src/assets/images/beck.jpeg';
import moment from 'moment';
import CommentChild from '../CommentChild';

import useStyles from '../useStyles';

interface CommentProps {
  cmtProps: any;
  currentUser: any;
}

function CommentParrent(props: CommentProps): JSX.Element {
  const classes = useStyles();
  const { cmtProps, currentUser } = props;
  const dispatch = useDispatch<any>();
  const [textArea, setTextArea] = useState<string>('');
  const [isReply, setisReply] = useState<boolean>(false);
  const [parent, setParent] = useState<number>(0);
  const valueRef = useRef<HTMLInputElement>();
  const formatDate = (time: number) => moment(time * 1000).fromNow();

  const renderTimelineConnector = (cmts: number, lastCmt: number) => {
    if (cmts > 0) {
      if (lastCmt === cmts - 1) {
        return null;
      }
      return <TimelineConnector />;
    }
    return null;
  };

  const onAnswer = (cmtID) => {
    console.log(cmtID)
    setParent(cmtID);
    setisReply(!isReply);
  };

  const onKeyPressReply = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      valueRef.current?.blur();
      const payload: {
        user_id: string;
        photo_id: string | number;
        content: string;
        parent: null | number;
      } = {
        user_id: currentUser,
        photo_id: cmtProps?.photo_id,
        content: textArea,
        parent,
      };
      // dispatch(commentPhotoAction(payload));
      console.log('Parent: ', payload);
      setTextArea('');
      setisReply(false);
    }
  };

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

  const renderCmtInput = () => (
    <>
      {isReply ? (
        <TimelineItem className={classes.timeline}>
          <TimelineSeparator>
            <TimelineDot className={classes.dotAvatar}>
              <Avatar alt='ava' className={classes.avatar} src={Ava2} />
            </TimelineDot>
          </TimelineSeparator>

          <TimelineContent className={classes.content}>
            <Paper className={classes.paper} elevation={3}>
              <Typography className={`${classes.actionName} ${classes.textStyle}`} component='h6' variant='h6'>
                {`User ${currentUser}`}
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
                onKeyPress={onKeyPressReply}
                inputRef={valueRef}
                value={textArea}
              />
            </Paper>
          </TimelineContent>
        </TimelineItem>
        ) : null}
    </>
    );

  return (
    // <Grid>
    <TimelineItem className={classes.timeline}>
      <TimelineSeparator>
        <TimelineDot className={classes.dotAvatar}>
          <Avatar alt='ava' className={classes.avatar} src={cmtProps.avatar || Ava2} />
        </TimelineDot>
        {renderTimelineConnector(cmtProps.cmtLength, cmtProps.lastCmt)}
      </TimelineSeparator>
      <TimelineContent className={classes.content}>
        <Paper className={classes.paper} elevation={3}>
          <Grid className={classes.action}>
            <Typography className={`${classes.actionName} ${classes.textStyle}`} component='h6' variant='h6'>
              {cmtProps?.user_id}
            </Typography>
            <div className={classes.flex}>
              <Typography className={`${classes.actionTime} ${classes.textStyle}`} component='h6' variant='h6'>
                {formatDate(cmtProps?.created_at)}
              </Typography>
              <Typography
                onClick={() => onAnswer(cmtProps?.cmt_id)}
                className={`${classes.actionReply} ${classes.textStyle}`}
                component='h6'
                variant='h6'
              >
                Trả lời
              </Typography>
            </div>
          </Grid>
          <Typography className={`${classes.comment} ${classes.textStyle}`} component='h6' variant='h6'>
            {cmtProps.content}
          </Typography>
        </Paper>

        {/* ============ nested comment/reply ============ */}
        {cmtProps?.reply ? (
          <>
            {cmtProps.reply.map((item, index) => (
              <>
                <CommentChild
                  key={item.cmt_id}
                  renderTimelineConnector={renderTimelineConnector}
                  // isReplies={isReplies}
                  cmtChildProps={{ item, index, cmtProps, currentUser }}
                />
              </>
            ))}
            {renderCmtInput()}
          </>
        ) : (
          renderCmtInput()
        )}
      </TimelineContent>
    </TimelineItem>
    // </Grid>
  );
}

export default CommentParrent;
