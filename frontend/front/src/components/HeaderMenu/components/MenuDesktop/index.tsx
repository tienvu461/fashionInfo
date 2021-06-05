/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Menu, MenuItem, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import { clearStoreFromlocalStorage } from 'src/utils/localStorage';
import { ROUTE_HOME } from 'src/constants';
import LogoutIcon from 'src/assets/images/iconLogout.svg';
import useStyles from './useStyles';

type MenuProps = {
  menuId: string;
  anchorEl: any;
  handleMenuClose: any;
};

const MenuDesktop: FunctionComponent<MenuProps> = ({
  menuId,
  anchorEl,
  handleMenuClose,
}) => {
  const isMenuOpen = Boolean(anchorEl);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const loginStatus = useSelector(
    (state: any) => state.login.loginResponse.status
  );
  function logOut() {
    return {
      type: 'CLEAR_STORE'
    };
  }

  const onClickLogout = (e: any) => {
    e.preventDefault();
    dispatch(logOut());
    clearStoreFromlocalStorage();
    toast.success('Đăng xuất thành công');

    setTimeout(() => {
      history.push(ROUTE_HOME);
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
      ) : null }
    </Menu>
  );
};

export default MenuDesktop;
