/* eslint-disable react/require-default-props */
import React, { ReactChildren, ReactChild } from 'react';
import { Grid, useScrollTrigger, Zoom } from '@material-ui/core';

import useStyles from './useStyles';

interface ScrollProps {
  window?: () => Window;
  children: ReactChild | ReactChildren;
}

const ScrollToTop: React.FunctionComponent<ScrollProps> = ({ children, window }) => {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 500,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <Grid className={classes.root} onClick={handleClick} role='presentation'>
        {children}
      </Grid>
    </Zoom>
  );
};

export default ScrollToTop;
