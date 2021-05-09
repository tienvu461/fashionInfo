import React, { ReactChildren, ReactChild } from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
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
          <Toolbar>
            <Grid className={classes.header}>
              <Grid className={classes.logo}>
                <img alt='Lucete' src={logo} />
              </Grid>
              <Hidden smDown>
                <Grid className={classes.links}>
                  <List
                    aria-labelledby='main navigation'
                    className={classes.navLinks}
                    component='nav'
                  >
                    {navLinks.map(({ title, path }) => (
                      <a key={title} className={classes.linkText} href={path}>
                        <ListItem button>
                          <ListItemText
                            primary={
                              <span className={classes.text}>{title}</span>
                            }
                          />
                        </ListItem>
                      </a>
                    ))}
                  </List>
                </Grid>
                <Grid className={classes.actions}>
                  <Grid className={classes.icon}>
                    <img alt='Lucete' src={icon} />
                  </Grid>
                  <Grid>
                    <Search />
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
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid>{children}</Grid>
    </div>
  );
}

export default HeaderMenu;
