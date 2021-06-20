import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import useStyles from './useStyles';

interface TagsProps {
    listTags: Array<string>;
}

const Tags: React.FunctionComponent<TagsProps> = ({ listTags }) => {
  const classes = useStyles();
  return (
    <div className='article-tags'>
      <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
        <div className={classes.tags}>
          {listTags.map((item: string, index: number) => (
            <Grid key={`${index + 1}`} className={classes.tag}>
              <Typography className={classes.tagText}>#{item}</Typography>
            </Grid>
          ))}
        </div>
      </Grid>
    </div>
  );
};

export default Tags;
