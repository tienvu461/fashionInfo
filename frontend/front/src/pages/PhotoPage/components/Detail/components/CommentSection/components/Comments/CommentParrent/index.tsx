/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useRef, useState } from 'react';
import { Grid, Paper, Typography, Avatar } from '@material-ui/core';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@material-ui/lab';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { commentPhotoAction } from 'src/features/Photo/photoAction';
import Ava2 from 'src/assets/images/beck.jpeg';
import { RootState } from 'src/store/store';
import { HOST } from 'src/apis';
import CommentBox from 'src/components/CommentBox';
import CommentChild from '../CommentChild';

import useStyles from '../useStyles';

interface CommentProps {
  cmtProps: any;
  userID: any;
}

function CommentParrent(props: CommentProps): JSX.Element {
  const classes = useStyles();
  const { cmtProps, userID } = props;

  const dispatch = useDispatch<any>();
  const valueRef = useRef<HTMLInputElement>();
  const [parent, setParent] = useState<number>(0);
  const [textArea, setTextArea] = useState<string>('');
  const [isReply, setisReply] = useState<boolean>(false);
  const loginStatus = useSelector((state: RootState) => state.login.loginResponse.status);
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
        user_id: userID,
        photo_id: cmtProps?.photo_id,
        content: textArea,
        parent,
      };
      dispatch(commentPhotoAction(payload));
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
        <CommentBox
          onTextFieldChange={onTextFieldChange}
          onKeyPress={onKeyPressReply}
          valueRef={valueRef}
          textArea={textArea}
          keyClassName='timeline'
        />
      ) : null}
    </>
  );

  return (
    <TimelineItem className={classes.timeline}>
      <TimelineSeparator>
        <TimelineDot className={classes.dotAvatar}>
          <Avatar alt='ava' className={classes.avatar} src={`${HOST}${cmtProps.user_photo}` || Ava2} />
        </TimelineDot>
        {renderTimelineConnector(cmtProps.cmtLength, cmtProps.lastCmt)}
      </TimelineSeparator>
      <TimelineContent className={classes.content}>
        <Paper className={classes.paper} elevation={3}>
          <Grid className={loginStatus === 200 ? classes.action : classes.actionWithoutLogin}>
            <Typography className={`${classes.actionName} ${classes.textStyle}`} component='h6' variant='h6'>
              {cmtProps?.user_fullname}
            </Typography>
            <div className={classes.flex}>
              <Typography className={`${classes.actionTime} ${classes.textStyle}`} component='h6' variant='h6'>
                {formatDate(cmtProps?.created_at)}
              </Typography>

              {loginStatus === 200 ? (
                <Typography
                  onClick={() => onAnswer(cmtProps?.cmt_id)}
                  className={`${classes.actionReply} ${classes.textStyle}`}
                  component='h6'
                  variant='h6'
                >
                  Trả lời
                </Typography>
              ) : null}
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
                  cmtChildProps={{ item, index, cmtProps, userID }}
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
  );
}

export default CommentParrent;
