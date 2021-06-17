/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, Paper, Typography, TextField } from '@material-ui/core';
import { TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@material-ui/lab';
import Ava3 from 'src/assets/images/ava3.svg';

import useStyles from './useStyles';

interface CmtBox {
  onTextFieldChange: any;
  onKeyPress: any;
  valueRef: any;
  textArea: any;
  keyClassName: string;
}

function CommentBox(props: CmtBox): JSX.Element {
    const classes = useStyles();
    const { onTextFieldChange, onKeyPress, valueRef, textArea, keyClassName } = props;

    const avatar = useSelector((state: any) => state.profile.currentUser.profile_photo);
    const firstName = useSelector((state: any) => state.profile.currentUser.user?.first_name);
    const lastName = useSelector((state: any) => state.profile.currentUser.user?.last_name);
    const userName = `${firstName} ${lastName}`;

    const className = keyClassName === 'timeline' ? classes.timeline : classes.timelineTwo;

    return (
      <TimelineItem className={className}>
        <TimelineSeparator>
          <TimelineDot className={classes.dotAvatar}>
            <Avatar alt='ava' className={classes.avatar} src={avatar || Ava3} />
          </TimelineDot>
        </TimelineSeparator>

        <TimelineContent className={classes.content}>
          <Paper className={classes.paper} elevation={3}>
            <Typography className={`${classes.actionName} ${classes.textStyle}`} component='h6' variant='h6'>
              {userName}
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
    );
}

export default CommentBox;
