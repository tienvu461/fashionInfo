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
  IconButton,
  Toolbar,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useStyles from './useStyles';
import logo from '../../assets/images/logoLucete.svg';
import icon from '../../assets/images/user.svg';
import Search from './components/Search';
import SideDrawer from './components/Drawer';
import ScrollToTop from './components/ScrollToTop';
import MenuDesktop from './components/MenuDesktop';
import { ROUTE_FORUM, ROUTE_HOME, ROUTE_PHOTO } from '../../constants';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [active, setActive] = useState(location.pathname);

  const menuId = 'search-menu';
  const handleProfileMenuOpen = (event: any) => {
  setAnchorEl(event.currentTarget);
};
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

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
                  {/* <Grid className={classes.icon}>
                    <img
                      alt='Lucete'
                      onClick={() => history.push('/login')}
                      src={icon}
                    />
                  </Grid> */}
                  <div className={classes.sectionDesktop}>
                    <IconButton
                      edge='end'
                      aria-label='account of current user'
                      aria-controls={menuId}
                      aria-haspopup='true'
                      onClick={handleProfileMenuOpen}
                      color='inherit'>
                      <img
                        alt='Lucete'
                        src={icon}
                      />
                    </IconButton>
                  </div>
                </Grid>
              </Hidden>
              <MenuDesktop
                menuId={menuId}
                anchorEl={anchorEl}
                handleMenuClose={handleMenuClose}
              />
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
