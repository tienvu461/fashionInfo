/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Drawer, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Menu } from '@material-ui/icons';
import { magazineMenu } from 'src/features/Magazine/MagazineSlice';
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
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState<AnchorState>({ right: false });
  const [openListItem, setOpenListItem] = useState<boolean>(false);

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

  const menuTabMagazine: Array<{menu: string; id: number}> = [
    {
      menu: 'Thời trang',
      id: 0
    },
    {
      menu: 'Giải trí',
      id: 1
    },
    {
      menu: 'Nghệ thuật',
      id: 2
    },
    {
      menu: 'Phong cách sống',
      id: 3
    },
  ];

  const handleClickSubMenu = (menu: {menu: string; id: number}) => {
    dispatch(magazineMenu(menu));
  };

  const sideDrawerList = (anchor: string) => (
    <div
      className={classes.list}
      role='presentation'
    >
      <List component='nav'>
        {navLinks.map(({ title, path }) => (
          <>
            <ListItem
              button
              key={title}
              onClick={() => {
                history.push(path);
                toggleDrawer(anchor, false);
                if (title === 'Magazine') {
                  setOpenListItem(!openListItem);
                }
              }}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <ListItemText primary={title} />
            </ListItem>
            {title === 'Magazine' ? (
              <Collapse in={openListItem} timeout='auto' unmountOnExit>
                <List className={classes.subList} component='div' disablePadding>
                  {menuTabMagazine.map((item) => (
                    <ListItem onClick={() => handleClickSubMenu(item)} button key={item.id}>
                      <ListItemText primary={item.menu} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            ) : null}
          </>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Menu className={classes.menuBtn} fontSize='large' onClick={toggleDrawer('right', true)} />

      <Drawer className={classes.drawer} anchor='right' onClose={toggleDrawer('right', false)} open={state.right}>
        {sideDrawerList('right')}
      </Drawer>
    </>
  );
}

export default SideDrawer;
