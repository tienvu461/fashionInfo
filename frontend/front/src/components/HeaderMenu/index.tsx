/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Container, Grid } from '@material-ui/core';
import React from 'react';
import useStyles from './useStyles';

function HeaderMenu(props: any): JSX.Element {
  const { children } = props;
  const classes = useStyles();
  return (
    <div>
      <Container fixed>
        <Grid className={classes.header}>Header</Grid>
      </Container>
      <Grid>{children}</Grid>
    </div>
  );
}

export default HeaderMenu;
