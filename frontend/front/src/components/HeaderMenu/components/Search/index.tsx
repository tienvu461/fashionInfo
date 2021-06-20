/* eslint-disable import/no-unresolved */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, TextField } from '@material-ui/core';
import { debounce } from 'lodash';

import searchIcon from 'src/assets/images/searchIcon.svg';
import clearIcon from 'src/assets/images/clearIcon.png';
import { searchAction } from 'src/features/Search/searchAction';
import useStyles from './useStyles';

function Search(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const [clear, setClear] = useState<boolean>(false);
  const [focused, setFocused] = useState(false);
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

  const loadingIcon = () => (
    <>
      {loading ? (
        <CircularProgress size={20} /> // loading icon
      ) : (
        <>
          {click ? (
            <img
              alt='clear-search'
              onMouseEnter={() => onMouse('hover')}
              onMouseLeave={() => onMouse('leave')}
              src={clearIcon}
              onClick={(e) => clearSearch(e)}
              style={{ cursor: 'pointer' }}
            />
          ) : null}
        </>
      )}
    </>
  );

  const triggerClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setClick(true); // [1] open TEXT FIELD, so function onFocus() is called
  };

  const onFocus = () => {
    // focused = true in order to hold the input always open, so useEffect does not run
    setFocused(true);
  };

  const onMouse = (key: string) => {
    if (key === 'hover') { // [2.1]: USER HOVER A X ICON, THEN SET STATE TO HOLDING THE INPUT ALWAYS OPEN. AND THE useEffect does not run.
      setClear(true);
    } else { // [2.2]: USER LEAVE THE MOUSE POINTER OUT OF THE X ICON, SET STATE CLEAR = FALSE TO RUN THE FUNCTION onBlur().
      setClear(false);
    }
  };

  const onBlur = () => {
    if (clear) { // [2.1] IF USER HOVER A X ICON (means state clear = true), THEN CLICK X ICON WHILE HOLDING THE INPUT IS OPENING (focused = true)
      setFocused(true);
    } else { // [2.2] IF NOT, USER CLICK ANYWHERE TO CLOSE THE INPUT. The useEffect will see the focused = false so it runs to close the input.
      setFocused(false);
    }
  };

  const clearSearch = (e) => {
    e.preventDefault();
    // [3] clear text
    setValue('');
  };

  useEffect(() => {
    if (!focused) {
      setClick(false);
    }
  }, [focused]);

  return (
    <>
      <Grid className={classes.search}>
        <Grid container spacing={1} alignItems='flex-end'>
          <Grid item className={classes.searchIcon}>
            <img alt='Search' src={searchIcon} />
          </Grid>
          <Grid item>
            <TextField
              onBlur={onBlur}
              onFocus={onFocus}
              onClick={(e) => triggerClick(e)}
              onChange={onChange}
              value={value}
              inputRef={valueRef}
              onKeyDown={handleKeyDown}
              InputProps={{
                className: focused ? classes.inputInput : classes.not,
                classes: { input: classes.placeHolderInput },
                endAdornment: loadingIcon(),
              }}
              id='input-with-icon-grid'
              placeholder='Search...'
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Search;
