/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Grid, Paper, Typography, Avatar } from '@material-ui/core';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@material-ui/lab';

import useStyles from '../useStyles';

interface CommentProps {
  cmtProps: any;
}

function CommentParrent(props: CommentProps): JSX.Element {
  const classes = useStyles();
  const { cmtProps } = props;

  return (
    <Grid>
      <TimelineItem className={classes.timeline}>
        <TimelineSeparator>
          <TimelineDot className={classes.dotAvatar}>
            <Avatar alt='ava' className={classes.avatar} src={cmtProps.ava} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className={classes.content}>
          <Paper className={classes.paper} elevation={3}>
            <Grid className={classes.action}>
              <Typography className={`${classes.actionName} ${classes.textStyle}`} component='h6' variant='h6'>
                {cmtProps.user_name}
              </Typography>
              <Typography className={`${classes.actionTime} ${classes.textStyle}`} component='h6' variant='h6'>
                2 phút trước
              </Typography>
              <Typography className={`${classes.actionReply} ${classes.textStyle}`} component='h6' variant='h6'>
                Trả lời
              </Typography>
            </Grid>
            <Typography className={`${classes.comment} ${classes.textStyle}`} component='h6' variant='h6'>
              {cmtProps.content}
            </Typography>
          </Paper>

          {/* ============ nested comment/reply ============ */}
          {cmtProps?.reply.length > 0 ? (
            <>
              {cmtProps.reply.map((item) => (
                <TimelineItem key={item.cmt_child_id} className={classes.nestedTimeline}>
                  <TimelineSeparator>
                    <TimelineDot className={classes.dotAvatar}>
                      <Avatar alt='ava' className={classes.avatar} src={item.ava} />
                    </TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent className={classes.content}>
                    <Paper className={classes.paper} elevation={3}>
                      <Grid className={classes.action}>
                        <Typography
                          className={`${classes.actionName} ${classes.textStyle}`}
                          component='h6'
                          variant='h6'
                        >
                          {item.user_name}
                        </Typography>
                        <Typography
                          className={`${classes.actionTime} ${classes.textStyle}`}
                          component='h6'
                          variant='h6'
                        >
                          2 phút trước
                        </Typography>
                        <Typography
                          className={`${classes.actionReply} ${classes.textStyle}`}
                          component='h6'
                          variant='h6'
                        >
                          Trả lời
                        </Typography>
                      </Grid>
                      <Typography className={`${classes.comment} ${classes.textStyle}`} component='h6' variant='h6'>
                        {item.nestedContent}
                      </Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </>
          ) : null}
        </TimelineContent>
      </TimelineItem>
    </Grid>
  );
}

export default CommentParrent;
