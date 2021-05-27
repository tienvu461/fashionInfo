import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Menu, MenuItem, Typography } from '@material-ui/core';
import { clearStoreFromlocalStorage } from '../../../../utils/localStorage';
import useStyles from './useStyles';
import { ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_HOME } from '../../../../constants';
import LoginIcon from '../../../../assets/images/user.svg';
import RegisterIcon from '../../../../assets/images/registration.svg';
// import { toast } from 'react-toastify';
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

  const loginData = useSelector(
    (state: any) => state.login.loginResponse.userID
  );
  // const logOut = () => {
  //   return {
  //     type: 'CLEAR_STORE',
  //   };
  // };

  function logOut() {
    return {
      type: 'CLEAR_STORE'
    }
  }

  const onClickLogout = (e: any) => {
    e.preventDefault();
    dispatch(logOut());
    clearStoreFromlocalStorage();
    // toast.success('Đăng xuất thành công');

    setTimeout(() => {
      history.push(ROUTE_HOME);
    }, 2000);
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
      className={classes.menu}>
      {loginStatus === 200 ? (
        <div>
          <Link
            to={ROUTE_LOGIN}
            style={{ textDecoration: 'none', color: 'black' }}>
            <MenuItem onClick={handleMenuClose} className={classes.menuItem}>
              {/* <PersonIcon className={classes.iconItem} /> */}
              {/* <MenuItem onClick={handleMenuClose} className={classes.menuItem}> */}
              <img
                src={LoginIcon}
                alt='register'
                className={classes.iconItem}
              />
              <Typography component='span' className={classes.linkItem}>
                UserID {loginData}
              </Typography>
            </MenuItem>
          </Link>
          <Link
            to={ROUTE_HOME}
            onClick={onClickLogout}
            style={{ textDecoration: 'none', color: 'black' }}>
            <MenuItem onClick={handleMenuClose} className={classes.menuItem}>
              <img
                src={RegisterIcon}
                alt='register'
                className={classes.iconItem}
              />
              <Typography component='span' className={classes.linkItem}>
                Logout
              </Typography>
            </MenuItem>
          </Link>
        </div>
      ) : (
        <div>
          <Link
            to={ROUTE_LOGIN}
            style={{ textDecoration: 'none', color: 'black' }}>
            <MenuItem onClick={handleMenuClose} className={classes.menuItem}>
              {/* <MenuItem onClick={handleMenuClose} className={classes.menuItem}> */}
              <img
                src={LoginIcon}
                alt='register'
                className={classes.iconItem}
              />
              <Typography component='span' className={classes.linkItem}>
                Đăng nhập
              </Typography>
            </MenuItem>
          </Link>
          <Link
            to={ROUTE_REGISTER}
            style={{ textDecoration: 'none', color: 'black' }}>
            <MenuItem onClick={handleMenuClose} className={classes.menuItem}>
              <img
                src={RegisterIcon}
                alt='register'
                className={classes.iconItem}
              />
              <Typography component='span' className={classes.linkItem}>
                Đăng ký
              </Typography>
            </MenuItem>
          </Link>
        </div>
      )}
    </Menu>
  );
};

export default MenuDesktop;
