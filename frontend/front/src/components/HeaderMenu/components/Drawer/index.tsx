import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import useStyles from './useStyles';

interface AnchorState {
  right: boolean;
}
interface NavLinksType {
  navLinks: Array<{
    title: string;
    path: string;
  }>;
}

function SideDrawer({ navLinks }: NavLinksType): JSX.Element {
  const classes = useStyles();
  const [state, setState] = useState<AnchorState>({ right: false });

  const toggleDrawer = (anchor: string, open: boolean) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if (anchor === 'right') {
      setState({
        right: open,
      });
    }
  };

  const sideDrawerList = (anchor: string) => (
    <div
      className={classes.list}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      role='presentation'
    >
      <List component='nav'>
        {navLinks.map(({ title, path }) => (
          <a key={title} className={classes.linkText} href={path}>
            <ListItem button>
              <ListItemText primary={title} />
            </ListItem>
          </a>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Menu
        className={classes.menuBtn}
        fontSize='large'
        onClick={toggleDrawer('right', true)}
      />

      <Drawer anchor='right' onClose={toggleDrawer('right', false)} open={state.right}>
        {sideDrawerList('right')}
      </Drawer>
    </>
  );
}

export default SideDrawer;
