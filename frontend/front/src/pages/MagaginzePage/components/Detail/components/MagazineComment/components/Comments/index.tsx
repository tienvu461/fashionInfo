/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Avatar, Paper, Typography, TextField } from '@material-ui/core';
import { Timeline, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@material-ui/lab';
import { RootState } from 'src/store/store';

import Ava3 from 'src/assets/images/ava3.svg';

import useStyles from './useStyles';

function Comments(): JSX.Element {
    const classes = useStyles();
    const [textArea, setTextArea] = useState<string>('');
    const valueRef = useRef<HTMLInputElement>();
    const loginStatus = useSelector((state: RootState) => state.login.loginResponse.status);
    const firstName = useSelector((state: any) => state.profile.currentUser.user?.first_name);
    const lastName = useSelector((state: any) => state.profile.currentUser.user?.last_name);
    const avatar = useSelector((state: any) => state.profile.currentUser.profile_photo);

    const userName = `${firstName} ${lastName}`;

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
        // const payload: {
        //   user_id: string;
        //   photo_id: string | number;
        //   content: string;
        //   parent: null;
        // } = {
        //   user_id: user,
        //   photo_id: photoId,
        //   content: textArea,
        //   parent: null,
        // };
        // dispatch(commentPhotoAction(payload));
        setTextArea('');
      }
    };

    return (
      <Grid className={classes.root}>
        {/* <Timeline className={classes.rootTimeline}>{listComments}</Timeline> */}
        {loginStatus === 200 ? (
          <Timeline className={classes.rootTimeline}>
            <TimelineItem className={classes.timeline}>
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
          </Timeline>
        ) : null}
      </Grid>
    );
}

export default Comments;
