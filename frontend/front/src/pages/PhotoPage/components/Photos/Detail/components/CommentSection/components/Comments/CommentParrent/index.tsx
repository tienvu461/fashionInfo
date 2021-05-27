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
import Ava2 from 'src/assets/images/beck.jpeg';
import moment from 'moment';

import useStyles from '../useStyles';

interface CommentProps {
  cmtProps: any;
}

function CommentParrent(props: CommentProps): JSX.Element {
  const classes = useStyles();
  const { cmtProps } = props;

  const formatDate = (time: number) => moment(time * 1000).fromNow();

  return (
    // <Grid>
    <TimelineItem className={classes.timeline}>
      <TimelineSeparator>
        <TimelineDot className={classes.dotAvatar}>
          <Avatar alt='ava' className={classes.avatar} src={cmtProps.avatar || Ava2} />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent className={classes.content}>
        <Paper className={classes.paper} elevation={3}>
          <Grid className={classes.action}>
            <Typography className={`${classes.actionName} ${classes.textStyle}`} component='h6' variant='h6'>
              {`User ${cmtProps?.user_id}`}
            </Typography>
            <div className={classes.flex}>
              <Typography className={`${classes.actionTime} ${classes.textStyle}`} component='h6' variant='h6'>
                {formatDate(cmtProps?.created_at)}
              </Typography>
              <Typography className={`${classes.actionReply} ${classes.textStyle}`} component='h6' variant='h6'>
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
            {cmtProps.reply.map((item) => (
              <TimelineItem key={item.cmt_id} className={classes.nestedTimeline}>
                <TimelineSeparator>
                  <TimelineDot className={classes.dotAvatar}>
                    <Avatar alt='ava' className={classes.avatar} src={Ava2} />
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent className={classes.content}>
                  <Paper className={classes.paper} elevation={3}>
                    <Grid className={classes.action}>
                      <Typography className={`${classes.actionName} ${classes.textStyle}`} component='h6' variant='h6'>
                        {`User ${item?.user_id}`}
                      </Typography>

                      <div className={classes.flex}>
                        <Typography
                          className={`${classes.actionTime} ${classes.textStyle}`}
                          component='h6'
                          variant='h6'
                        >
                          {formatDate(item?.created_at)}
                        </Typography>
                        <Typography
                          className={`${classes.actionReply} ${classes.textStyle}`}
                          component='h6'
                          variant='h6'
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
            ))}
          </>
        ) : null}
      </TimelineContent>
    </TimelineItem>
    // </Grid>
  );
}

export default CommentParrent;
