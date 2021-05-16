/* eslint-disable react/require-default-props */
import React, { ReactChildren, ReactChild } from 'react';
import { useScrollTrigger, Zoom } from '@material-ui/core';

interface ScrollProps {
  window?: () => Window;
  children: ReactChild | ReactChildren;
}

function ScrollToTop({ children, window }: ScrollProps): JSX.Element {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role='presentation'
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
        }}
      >
        {children}
      </div>
    </Zoom>
  );
}

export default ScrollToTop;
