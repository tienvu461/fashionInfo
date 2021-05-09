import React, { ReactChildren, ReactChild } from 'react';
import { Grid } from '@material-ui/core';

import useStyles from './useStyles';
import logo from '../../assets/images/logo_lucete.svg';
import icon from '../../assets/images/user.svg';
import Search from './components/Search';

interface AuxProps {
  children: ReactChild | ReactChildren;
}

function HeaderMenu({ children }: AuxProps): JSX.Element {
  const classes = useStyles();
  return (
    <div>
      <Grid
        alignItems='center'
        className={classes.root}
        container
        direction='row'
        justify='center'
      >
        <Grid className={classes.header}>
          <Grid className={classes.logo}>
            <img alt='Lucete' src={logo} />
          </Grid>
          <Grid className={classes.links}>
            <Grid className={classes.menu}>Photo</Grid>
            <Grid className={classes.menu}>News</Grid>
            <Grid className={classes.menu}>Forum</Grid>
          </Grid>
          <Grid className={classes.actions}>
            <Grid className={classes.icon}>
              <img alt='Lucete' src={icon} />
            </Grid>
            <Grid>
              <Search />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid>{children}</Grid>
    </div>
  );
}

export default HeaderMenu;
