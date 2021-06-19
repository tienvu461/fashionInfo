/* eslint-disable import/no-unresolved */
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, InputBase } from '@material-ui/core';
import { debounce } from 'lodash';

import searchIcon from 'src/assets/images/searchIcon.svg';
import { searchAction } from 'src/features/Search/searchAction';
import useStyles from './useStyles';

function Search(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const valueRef = useRef<HTMLInputElement>();
  const dispatch = useDispatch();
  const onChange = (event) => {
    const textSearch = event.target.value;
    setValue(textSearch);
  };

  const search = debounce(() => {
    dispatch(searchAction(1, value));
    history.push(`/photo/search/${value}`);
    setValue('');
    setLoading(false);
    valueRef.current?.blur();
  }, 1000);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (value !== '') {
      if (event.key === 'Enter') {
        setLoading(true);
        search();
      }
    }
  };

  const loadingSearch = () => (
    <>
      {
        loading ? <CircularProgress size={20} /> : null
      }
    </>
  );

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
        endAdornment={loadingSearch()}
      />
    </Grid>
  );
}

export default Search;
