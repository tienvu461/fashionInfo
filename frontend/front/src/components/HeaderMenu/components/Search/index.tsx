import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, InputBase } from '@material-ui/core';
import searchIcon from '../../../../assets/images/searchIcon.svg';
import { searchAction } from '../../../../features/Search/searchAction';
import useStyles from './useStyles';

function Search(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const onChange = (event) => { setValue(event.target.value) };

  const handleKeyDown = (event) => {
    if (event.target.value !== '') {
      if (event.key === 'Enter') {
      dispatch(searchAction(event.target.value))
      console.log('Enter', event.target.value)
      history.push(`/photo/search/${event.target.value}`)
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
        style={{ fontFamily: 'Roboto', fontSize: '24' }}
      />
    </Grid>
  );
}

export default Search;
