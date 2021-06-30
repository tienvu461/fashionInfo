/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import { searchMagazineAction, searchPhotoAction } from 'src/features/Search/searchAction';

import useStyles from './useStyles';

interface TagsProps {
  listTags: Array<string>;
  page: string;
}

const Tags: React.FunctionComponent<TagsProps> = ({ listTags, page }) => {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const history = useHistory();

  const handleClickTag = (tag: string) => {
    if (page === 'magazine') {
      dispatch(searchMagazineAction(1, tag));
      history.push(`/magazine/search/${tag}`);
    } else {
      dispatch(searchPhotoAction(1, tag));
      history.push(`/photo/search/${tag}`);
    }
  };

  return (
    <div className='article-tags'>
      <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
        <div className={classes.tags}>
          {listTags.map((item: string, index: number) => (
            <Grid onClick={() => handleClickTag(item)} key={`${index + 1}`} className={classes.tag}>
              <Typography className={classes.tagText}>#{item}</Typography>
            </Grid>
          ))}
        </div>
      </Grid>
    </div>
  );
};

export default Tags;
