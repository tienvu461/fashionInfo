/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, { ReactChildren, ReactChild, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Grid,
  AppBar,
  List,
  ListItem,
  ListItemText,
  Hidden,
  CssBaseline,
  Toolbar,
} from '@material-ui/core';

import logo from 'src/assets/images/logoLucete.svg';
import icon from 'src/assets/images/user.svg';
import { ROUTE_FORUM, ROUTE_HOME, ROUTE_PHOTO } from 'src/constants';
import useStyles from './useStyles';
import Search from './components/Search';
import SideDrawer from './components/Drawer';
import ScrollToTop from './components/ScrollToTop';

interface AuxProps {
  window?: () => Window;
  children: ReactChild | ReactChildren;
}

interface NavLinksType {
  title: string;
  path: string;
}

function HeaderMenu(props: AuxProps): JSX.Element {
  const { children } = props;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  const navLinks: Array<NavLinksType> = [
    { title: 'Magazine', path: ROUTE_HOME },
    { title: 'Photo', path: ROUTE_PHOTO },
    { title: 'Forum', path: ROUTE_FORUM },
  ];

  return (
    <div style={{ position: 'relative' }}>
      <CssBaseline />

      <div className={classes.root}>
        <Grid
          alignItems='center'
          className={classes.navbar}
          container
          direction='row'
          justify='center'
        >
          <AppBar>
            <Grid
              className={classes.header}
              item
              lg={12}
              md={12}
              sm={12}
              xs={12}
            >
              <Grid className={classes.logo}>
                <img
                  alt='Lucete'
                  onClick={() => history.push('/')}
                  src={logo}
                />
              </Grid>
              <Hidden smDown>
                <Grid className={classes.links}>
                  <List
                    aria-labelledby='main navigation'
                    className={classes.navLinks}
                    component='nav'
                  >
                    {navLinks.map(({ title, path }) => (
                      <div
                        key={title}
                        onClick={() => {
                          history.push(path);
                          setActive(path);
                        }}
                      >
                        <ListItem button>
                          <ListItemText
                            primary={
                              <>
                                {active === path ? (
                                  <span className={classes.textActive}>
                                    {title}
                                  </span>
                                ) : (
                                  <span className={classes.textNonActive}>
                                    {title}
                                  </span>
                                )}
                              </>
                            }
                          />
                        </ListItem>
                      </div>
                    ))}
                  </List>
                </Grid>
                <Grid className={classes.actions}>
                  <Search />
                  <Grid className={classes.icon}>
                    <img
                      alt='Lucete'
                      onClick={() => history.push('/login')}
                      src={icon}
                    />
                  </Grid>
                </Grid>
              </Hidden>
              <Hidden mdUp>
                <Grid className={classes.actions}>
                  <Grid className={classes.icon}>
                    <img
                      alt='Lucete'
                      onClick={() => history.push('/login')}
                      src={icon}
                    />
                  </Grid>
                  <Grid>
                    <Search />
                  </Grid>
                </Grid>
                <SideDrawer navLinks={navLinks} />
              </Hidden>
            </Grid>
          </AppBar>
          <Toolbar id='back-to-top-anchor' />
        </Grid>
        <Grid>{children}</Grid>
        <ScrollToTop {...props}>
          <div style={{ display: 'none' }} />
        </ScrollToTop>
      </div>
    </div>
  );
}

export default HeaderMenu;
