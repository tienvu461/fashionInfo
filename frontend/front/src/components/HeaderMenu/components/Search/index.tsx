import React from 'react';
import { Grid, InputBase } from '@material-ui/core';
import searchIcon from '../../../../assets/images/searchIcon.svg';

import useStyles from './useStyles';

function Search(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid className={classes.search}>
      <Grid className={classes.searchIcon}>
        <img alt='Search' src={searchIcon} />
      </Grid>
      <InputBase
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Grid>
  );
}

export default Search;
