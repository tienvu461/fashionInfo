import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@material-ui/lab';
import FastfoodIcon from '@material-ui/icons/Fastfood';

import useStyles from './useStyles';

function TreeView(): JSX.Element {
    const classes = useStyles();

    return (
      <Grid className={classes.root}>
        <Timeline className={classes.rootTimeline}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <FastfoodIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper className={classes.paper} elevation={3}>
                <Typography component='h1' variant='h6'>
                  Eat
                </Typography>
                <Typography>Because you need strength</Typography>
              </Paper>
              <TimelineSeparator>
                <TimelineDot>
                  <FastfoodIcon />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <Paper className={classes.paper} elevation={3}>
                  <Typography component='h1' variant='h6'>
                    Eat
                  </Typography>
                  <Typography>Because you need strength</Typography>
                </Paper>
              </TimelineContent>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot>
                <FastfoodIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper className={classes.paper} elevation={3}>
                <Typography component='h1' variant='h6'>
                  Eat
                </Typography>
                <Typography>Because you need strength</Typography>
              </Paper>
              <TimelineSeparator>
                <TimelineDot>
                  <FastfoodIcon />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <Paper className={classes.paper} elevation={3}>
                  <Typography component='h1' variant='h6'>
                    Eat
                  </Typography>
                  <Typography>Because you need strength</Typography>
                </Paper>
              </TimelineContent>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Grid>
    );
}

export default TreeView;
