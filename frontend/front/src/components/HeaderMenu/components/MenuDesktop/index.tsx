/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Menu, MenuItem, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import { clearStoreFromlocalStorage } from 'src/utils/localStorage';
import { ROUTE_HOME } from 'src/constants';
import { getListCategoryAction, getListMagazineAction } from 'src/features/Magazine/MagazineAction';
import LogoutIcon from 'src/assets/images/iconLogout.svg';
import { RootState } from 'src/store/store';
import { logoutSuccess } from 'src/features/Login/LoginSlice';
import useStyles from './useStyles';

type MenuProps = {
  menuId: string;
  anchorEl: any;
  handleMenuClose: any;
  setActive: any;
};

const MenuDesktop: FunctionComponent<MenuProps> = ({ menuId, anchorEl, handleMenuClose, setActive }) => {
  const isMenuOpen = Boolean(anchorEl);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const loginStatus = useSelector((state: RootState) => state.login.loginResponse.status);
  function logOut() {
    return {
      type: 'CLEAR_STORE',
    };
  }

  const onClickLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logOut());
    dispatch(logoutSuccess({ status: 0, logout: 'Logout success' }));
    dispatch(getListCategoryAction());
    dispatch(getListMagazineAction('Business', 1));
    clearStoreFromlocalStorage();
    toast.success('Đăng xuất thành công');

    setTimeout(() => {
      setActive(ROUTE_HOME);
      history.push(ROUTE_HOME);
      dispatch(logoutSuccess({}));
    }, 2000);
    handleMenuClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.menu}
    >
      {loginStatus === 200 ? (
        <MenuItem onClick={onClickLogout} className={classes.menuItem}>
          <img src={LogoutIcon} alt='register' />
          <Typography component='span' className={classes.linkItem}>
            Đăng xuất
          </Typography>
        </MenuItem>
      ) : null}
    </Menu>
  );
};

export default MenuDesktop;
