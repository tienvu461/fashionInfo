/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Grid, InputBase, TextField } from '@material-ui/core';
import { debounce } from 'lodash';

import searchIcon from 'src/assets/images/searchIcon.svg';
import clearIcon from 'src/assets/images/clearIcon.png';
import { searchPhotoAction } from 'src/features/Search/searchAction';
import useStyles from './useStyles';

interface SearchProps {
  screen: string;
  toggleDrawer: any;
}

const Search: React.FunctionComponent<SearchProps> = (props) => {
  const { screen, toggleDrawer } = props;
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
    dispatch(searchPhotoAction(1, value)).then(() => {
      if (screen === 'mobile') {
        toggleDrawer('right', false);
      }
    });
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
        <div className={classes.loadingIcon} style={screen === 'mobile' ? { paddingRight: '16px' } : { paddingBottom: '4px' }}>
          <CircularProgress size={24} />
        </div>
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
              className={screen === 'mobile' ? classes.clearMobileSearch : classes.clearDesktopSearch}
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

  const onMouse = (param: string) => {
    if (param === 'hover') { // [2.1]: USER HOVER A X ICON, THEN SET STATE TO HOLDING THE INPUT ALWAYS OPEN. AND THE useEffect does not run.
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

  const desktopSearch = () => (
    <Grid className={classes.search}>
      <Grid container alignItems='flex-end'>
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
              className: focused ? classes.inputDesktop : classes.not,
              classes: { input: classes.placeHolderInput },
              endAdornment: loadingIcon(),
            }}
            id='input-with-icon-grid'
            placeholder='Search...'
          />
        </Grid>
      </Grid>
    </Grid>
  );

  const mobileSearch = () => (
    <div className={classes.mobile}>
      <div className={classes.searchMobile}>
        <div className={classes.searchIconMobile}>
          <img alt='Search' src={searchIcon} />
        </div>
        <InputBase
          placeholder='Search…'
          onClick={(e) => triggerClick(e)}
          onFocus={onFocus}
          onBlur={onBlur}
          onMouseEnter={() => onMouse('hover')}
          onMouseLeave={() => onMouse('leave')}
          value={value}
          inputRef={valueRef}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          classes={{ input: classes.inputMobile }}
          endAdornment={loadingIcon()}
          fullWidth
        />
      </div>
    </div>
  );

  return (
    <>
      {
        screen === 'mobile' ? mobileSearch() : desktopSearch()
      }
    </>
  );
};

export default Search;
