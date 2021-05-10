import React, { ReactChildren, ReactChild, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  AppBar,
  List,
  ListItem,
  ListItemText,
  Hidden,
} from '@material-ui/core';

import useStyles from './useStyles';
import logo from '../../assets/images/logoLucete.svg';
import icon from '../../assets/images/user.svg';
import Search from './components/Search';
import SideDrawer from './components/Drawer';

interface AuxProps {
  children: ReactChild | ReactChildren;
}
interface NavLinksType {
  title: string;
  path: string;
}

function HeaderMenu({ children }: AuxProps): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const pathName = window.location.pathname;
  const [active, setActive] = useState(pathName);

  const navLinks: Array<NavLinksType> = [
    { title: 'Photo', path: '/' },
    { title: 'News', path: '/news' },
    { title: 'Forum', path: '/forum' },
  ];

  return (
    <div className={classes.root}>
      <Grid
        alignItems='center'
        className={classes.navbar}
        container
        direction='row'
        justify='center'
      >
        <AppBar>
          <Grid className={classes.header}>
            <Grid className={classes.logo}>
              <img alt='Lucete' onClick={() => history.push('/')} src={logo} />
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
                  <img alt='Lucete' src={icon} />
                </Grid>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid className={classes.actions}>
                <Grid className={classes.icon}>
                  <img alt='Lucete' src={icon} />
                </Grid>
                <Grid>
                  <Search />
                </Grid>
              </Grid>
              <SideDrawer navLinks={navLinks} />
            </Hidden>
          </Grid>
        </AppBar>
      </Grid>
      <Grid>{children}</Grid>
    </div>
  );
}

export default HeaderMenu;
