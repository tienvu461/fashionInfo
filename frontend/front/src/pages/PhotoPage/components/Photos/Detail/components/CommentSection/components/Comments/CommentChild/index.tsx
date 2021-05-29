/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { Grid, Paper, Typography, Avatar, TextField } from '@material-ui/core';
import {
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@material-ui/lab';
import moment from 'moment';
import Ava2 from 'src/assets/images/beck.jpeg';

import useStyles from '../useStyles';

interface CmtChild {
  renderTimelineConnector: any;
  cmtChildProps: any;
  // isReplies: any;
}

function CommentChild(props: CmtChild): JSX.Element {
    const classes = useStyles();
    const [isReply, setisReply] = useState<boolean>(false);
    const [textArea, setTextArea] = useState<string>('');
    const [parent, setParent] = useState<number>(0);
    const valueRef = useRef<HTMLInputElement>();
    const { renderTimelineConnector, cmtChildProps } = props;
    const { item, index, cmtProps, currentUser } = cmtChildProps;
    const formatDate = (time: number) => moment(time * 1000).fromNow();

    const onAnswer = (cmtID) => {
      setParent(cmtID);
      setisReply(!isReply);
      // isReplies();
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

        console.log('Child: ', payload);
        // dispatch(commentPhotoAction(payload));
        setTextArea('');
        setisReply(false);
      }
    };
// style={index === cmtProps.reply.length - 1 ? { marginBottom: '100px' } : null}
    const renderCmtInput = () => (
      <>
        {isReply ? (
          <TimelineItem
            className={classes.timelineTwo}
          >
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
      <>
        <TimelineItem key={item.cmt_id} className={classes.nestedTimeline}>
          <TimelineSeparator>
            <TimelineDot className={classes.dotAvatar}>
              <Avatar alt='ava' className={classes.avatar} src={Ava2} />
            </TimelineDot>
            {renderTimelineConnector(cmtProps.reply.length, index)}
          </TimelineSeparator>
          <TimelineContent className={classes.content}>
            <Paper className={classes.paper} elevation={3}>
              <Grid className={classes.action}>
                <Typography className={`${classes.actionName} ${classes.textStyle}`} component='h6' variant='h6'>
                  {item?.user_id}
                </Typography>

                <div className={classes.flex}>
                  <Typography className={`${classes.actionTime} ${classes.textStyle}`} component='h6' variant='h6'>
                    {formatDate(item?.created_at)}
                  </Typography>
                  <Typography
                    className={`${classes.actionReply} ${classes.textStyle}`}
                    component='h6'
                    variant='h6'
                    onClick={() => onAnswer(cmtProps?.cmt_id)}
                  >
                    Trả lời
                  </Typography>
                </div>
              </Grid>
              <Typography className={`${classes.comment} ${classes.textStyle}`} component='h6' variant='h6'>
                {item.content}
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        {renderCmtInput()}
      </>
    );
}

export default CommentChild;
