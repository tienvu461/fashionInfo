/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, { ReactChildren, ReactChild, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  CircularProgress,
} from '@material-ui/core';
import logo from 'src/assets/images/logoLucete.svg';
import icon from 'src/assets/images/user.svg';
import ScrollIcon from 'src/assets/images/scrollToTop.svg';
import { RootState } from 'src/store/store';
import { getCredentialsFromLocalStorage } from 'src/utils/localStorage';
import Search from './components/Search';
import SideDrawer from './components/Drawer';
import ScrollToTop from './components/ScrollToTop';
import MenuDesktop from './components/MenuDesktop';
import useStyles from './useStyles';
import { ROUTE_FORUM, ROUTE_HOME, ROUTE_LOGIN, ROUTE_PHOTO } from '../../constants';

import './_headerMenu.scss';

interface AuxProps {
  window?: () => Window;
  children: ReactChild | ReactChildren;
}

interface NavLinksType {
  title: string;
  path: string;
}

const HeaderMenu: React.FunctionComponent<AuxProps> = (props) => {
  const { children } = props;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [active, setActive] = useState(location.pathname);
  const menuId = 'search-menu';
  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const navLinks: Array<NavLinksType> = [
    { title: 'Magazine', path: ROUTE_HOME },
    { title: 'Photo', path: ROUTE_PHOTO },
    { title: 'Forum', path: ROUTE_FORUM },
  ];

  const profiePhoto = useSelector((state: RootState) => state.profile.currentUser.profile_photo);

  const handleIconLogIn = () => {
    const getCredentials = getCredentialsFromLocalStorage();
    const credentials = JSON.parse(getCredentials);

    if (credentials && credentials?.status === 200) {
      return (
        <Grid className={classes.icon}>
          <IconButton
            edge='end'
            aria-label='account of current user'
            aria-controls={menuId}
            aria-haspopup='true'
            onClick={handleProfileMenuOpen}
            color='inherit'
            style={{ height: '40px', width: '40px' }}
          >
            <img alt='avt' src={profiePhoto} className={classes.iconImg} />
          </IconButton>
        </Grid>
      );
    }
    return (
      <Grid className={classes.icon}>
        <img
          alt='Lucete'
          onClick={() => {
            setActive(ROUTE_LOGIN);
            history.push(ROUTE_LOGIN);
          }}
          src={icon}
        />
      </Grid>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      <CssBaseline />

      <div className={classes.root}>
        <Grid alignItems='center' className={classes.navbar} container direction='row' justify='center'>
          <AppBar>
            <div className={`${classes.header} header`}>
              <Grid className={`${classes.logo} logo`}>
                <img
                  alt='Lucete'
                  onClick={() => {
                    setActive(ROUTE_HOME);
                    history.push('/');
                  }}
                  src={logo}
                />
              </Grid>
              <Hidden smDown>
                <Grid className={classes.links}>
                  <List aria-labelledby='main navigation' className={classes.navLinks} component='nav'>
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
                                  <span className={classes.textActive}>{title}</span>
                                ) : (
                                  <span className={classes.textNonActive}>{title}</span>
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
                  {handleIconLogIn()}
                </Grid>
              </Hidden>
              <MenuDesktop
                setActive={setActive}
                menuId={menuId}
                anchorEl={anchorEl}
                handleMenuClose={handleMenuClose}
              />
              <Hidden mdUp>
                <Grid className={classes.actions}>
                  {/* <Search /> */}
                  {handleIconLogIn()}
                </Grid>
                <SideDrawer setActive={setActive} navLinks={navLinks} />
              </Hidden>
            </div>
          </AppBar>
          <Toolbar id='back-to-top-anchor' />
        </Grid>
        <div>{children}</div>
        <ScrollToTop {...props}>
          <img alt='scroll-to-top' className={classes.scrollIcon} src={ScrollIcon} />
        </ScrollToTop>
      </div>
    </div>
  );
};

export default HeaderMenu;
