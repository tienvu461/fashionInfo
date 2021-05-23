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
import Ava1 from 'src/assets/images/menAva.jpg';
import Ava2 from 'src/assets/images/womenAva.jpg';
import useStyles from '../useStyles';

function CommentParrent(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <TimelineItem className={classes.timeline}>
        <TimelineSeparator>
          <TimelineDot className={classes.dotAvatar}>
            <Avatar alt='ava' className={classes.avatar} src={Ava1} />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent className={classes.content}>
          <Paper className={classes.paper} elevation={3}>
            <Grid className={classes.action}>
              <Typography className={`${classes.actionName} ${classes.textStyle}`} component='h6' variant='h6'>
                Anh Quynh Dang Nguyen
              </Typography>
              <Typography className={`${classes.actionTime} ${classes.textStyle}`} component='h6' variant='h6'>
                2 phút trước
              </Typography>
              <Typography className={`${classes.actionReply} ${classes.textStyle}`} component='h6' variant='h6'>
                Trả lời
              </Typography>
            </Grid>
            <Typography className={`${classes.comment} ${classes.textStyle}`} component='h6' variant='h6'>
              Ngày xưa mình dùng con Canon T60 để in ảnh cho khách, dùng mực ngoài Pigment khoảng 100k/100ml và 6 màu.
              In đẹp màu bền tuy nhiên phải dùng giấy loại xịn hoặc phải ép Plastic.
            </Typography>
          </Paper>

          {/* ============ nested comment/reply ============ */}
          <TimelineItem className={classes.nestedTimeline}>
            <TimelineSeparator>
              <TimelineDot className={classes.dotAvatar}>
                <Avatar alt='ava' className={classes.avatar} src={Ava2} />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent className={classes.content}>
              <Paper className={classes.paper} elevation={3}>
                <Grid className={classes.action}>
                  <Typography className={`${classes.actionName} ${classes.textStyle}`} component='h6' variant='h6'>
                    Anh Quynh Dang Nguyen
                  </Typography>
                  <Typography className={`${classes.actionTime} ${classes.textStyle}`} component='h6' variant='h6'>
                    2 phút trước
                  </Typography>
                  <Typography className={`${classes.actionReply} ${classes.textStyle}`} component='h6' variant='h6'>
                    Trả lời
                  </Typography>
                </Grid>
                <Typography className={`${classes.comment} ${classes.textStyle}`} component='h6' variant='h6'>
                  Ngày xưa mình dùng con Canon T60 để in ảnh cho khách, dùng mực ngoài Pigment khoảng 100k/100ml và 6
                  màu. In đẹp màu bền tuy nhiên phải dùng giấy loại xịn hoặc phải ép Plastic.
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </TimelineContent>
      </TimelineItem>
    </>
  );
}

export default CommentParrent;
