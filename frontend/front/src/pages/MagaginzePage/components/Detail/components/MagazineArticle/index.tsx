/* eslint-disable import/no-unresolved */
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Grid, Button, Typography, Divider, Box } from '@material-ui/core';
import { RootState } from 'src/store/store';

import './_magazineArticle.scss';
import useStyles from './useStyles';

function MagazineArticle(): JSX.Element {
  const classes = useStyles();

  const magazineDetail = useSelector((state: RootState) => state.magazine.magazineDetail);
  const formatDate = (time: number) => moment(time * 1000).fromNow();
  const {
    sub_category: subCategory = '',
    created_at: createAt = 0,
    title = ''
  } = magazineDetail;
  console.log(magazineDetail)

    return (
      <>
        <div className='subtitle'>
          <Typography className={`${classes.headerText} ${classes.subTitleArticle}`} component='h6' variant='h6'>
            {subCategory}
          </Typography>
          <Divider className={classes.divider} />
          <Typography className={`${classes.headerText} ${classes.time}`} gutterBottom variant='h6' component='h6'>
            {formatDate(createAt)}
          </Typography>
        </div>
        <Typography className={classes.mainTitle}>
          {title}
        </Typography>
      </>
    );
}

export default MagazineArticle;
