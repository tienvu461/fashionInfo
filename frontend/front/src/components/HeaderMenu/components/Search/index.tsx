/* eslint-disable import/no-unresolved */
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, InputBase } from '@material-ui/core';
import searchIcon from 'src/assets/images/searchIcon.svg';
import { searchAction } from 'src/features/Search/searchAction';
import useStyles from './useStyles';

function Search(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState<string>('');
  const valueRef = useRef<HTMLInputElement>();
  const dispatch = useDispatch();
  const onChange = (event) => {
    const textSearch = event.target.value;
    setValue(textSearch);
    };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (value !== '') {
      if (event.key === 'Enter') {
      dispatch(searchAction(1, value));
      history.push(`/photo/search/${value}`);
      setValue('');
      valueRef.current?.blur();
    }
    }
  };

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
        value={value}
        inputRef={valueRef}
        onKeyDown={handleKeyDown}
        style={{ fontFamily: 'Roboto', fontSize: '24' }}
      />
    </Grid>
  );
}

export default Search;
