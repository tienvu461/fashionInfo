/* eslint-disable import/no-unresolved */
import React from 'react';
import { Divider, Grid } from '@material-ui/core';
import CommentLayout from 'src/components/CommentLayout';
import Comments from 'src/components/Comments';

import useStyles from './useStyles';

interface CommentProps {
  paramsId: string;
}

function MagazineComment(props: CommentProps): JSX.Element {
    const { paramsId } = props;

    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Divider className={classes.divider} />
        <Grid className={classes.container} container>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <CommentLayout paramsId={paramsId}>
              <Comments keyItem='magazine' />
            </CommentLayout>
          </Grid>
        </Grid>
        <Divider />
      </div>
    );
}

export default MagazineComment;
