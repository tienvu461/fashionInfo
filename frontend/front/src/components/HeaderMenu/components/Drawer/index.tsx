/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, List, ListItem, ListItemText, Collapse, ListItemIcon } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { ExpandLess, ExpandMore, Menu } from '@material-ui/icons';
import { magazineMenu } from 'src/features/Magazine/MagazineSlice';
import { RootState } from 'src/store/store';
import Search from '../Search';
import useStyles from './useStyles';

interface AnchorState {
  right: boolean;
}
interface NavLinksType {
  navLinks: Array<{
    title: string;
    path: string;
  }>;
  setActive: any;
}

const SideDrawer: React.FunctionComponent<NavLinksType> = ({ navLinks, setActive }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch<any>();
  const [anchorState, setAnchorState] = useState<AnchorState>({ right: false });
  const [openListItem, setOpenListItem] = useState<boolean>(false);
  const categories = useSelector((state: RootState) => state.magazine.categories);

  const toggleDrawer = (anchor: string, open: boolean) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if (anchor === 'right') {
      setAnchorState({
        right: open,
      });
    }
  };

  const menuTabMagazine = !isEmpty(categories.results)
    ? categories.results.map((cat, index) => ({
        menu: cat.cat_name,
        id: index,
      }))
    : [];

  const handleClickSubMenu = (menu: { menu: string; id: number }, path: string) => {
    dispatch(magazineMenu(menu));
    history.push(path);
    setActive('/');
    setAnchorState({
      right: false,
    });
  };

  const handleClickListItem = (params: { title: string; path: string }) => {
    if (params.title === 'Magazine') {
      setOpenListItem(!openListItem);
      setAnchorState({
        right: true,
      });
    } else {
      history.push(params.path);
      setActive(params.path);
      setOpenListItem(false);
      setAnchorState({
        right: false,
      });
    }
  };

  const sideDrawerList = (anchor: string) => (
    <div className={classes.list} role='presentation'>
      <List component='nav'>
        {navLinks.map(({ title, path }) => (
          <>
            <ListItem
              button
              key={title}
              onClick={() => handleClickListItem({ title, path })}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <ListItemText primary={title} />
              {title === 'Magazine' ? (
                <ListItemIcon className={classes.listItemIcon}>
                  {openListItem ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
              ) : null}
            </ListItem>
            {title === 'Magazine' ? (
              <Collapse in={openListItem} timeout='auto' unmountOnExit>
                <List className={classes.subList} component='div' disablePadding>
                  {menuTabMagazine.map((item) => (
                    <ListItem onClick={() => handleClickSubMenu(item, path)} button key={item.id}>
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
      <Drawer className={classes.drawer} anchor='right' onClose={toggleDrawer('right', false)} open={anchorState.right}>
        <Search />
        {sideDrawerList('right')}
      </Drawer>
    </>
  );
};

export default SideDrawer;
