import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, InputBase } from '@material-ui/core';
import searchIcon from '../../../../assets/images/searchIcon.svg';
import { searchAction } from '../../../../features/Search/searchAction';
import useStyles from './useStyles';

function Search(): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const onChange = (event) => { setValue(event.target.value) };

  const handleKeyDown = (event) => {
    if (event.target.value !== '') {
      if (event.key === 'Enter') {
      dispatch(searchAction(event.target.value))
      console.log('Enter', event.target.value)
    }
    }
  }

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
        name='textSearch'
        placeholder='Search...'
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
    </Grid>
  );
}

export default Search;
