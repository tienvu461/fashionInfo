/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, Suspense } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import './App.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';

import {
  ROUTE_LOGIN,
  ROUTE_REGISTER,
} from './constants';
import {
  clearStoreFromlocalStorage,
  getCredentialsFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  getTokenFromLocalStorage,
  setDataFromLocalStorage
} from './utils/localStorage';

import { routes } from './configs/routes';
import Footer from './components/Footer';
import { RootState } from './store/store';
import HeaderMenu from './components/HeaderMenu';
import { loginSucess } from './features/Login/LoginSlice';
import { getUserProfile } from './features/Profile/ProfileAction';
import { refreshTokenAction } from './features/Login/LoginAction';
import { getListCategoryAction } from './features/Magazine/MagazineAction';

toast.configure({
  autoClose: 2000
});

const checkExpired = (value) => {
  let isExpired = false;
  const now = new Date();

  if (value.exp < now.getTime() / 1000) { // is expired
    isExpired = true;
  }
  return isExpired;
};

const logOut = () => ({
  type: 'CLEAR_STORE',
});

function App(): JSX.Element {
  const dispatch = useDispatch<any>();
  const logoutStatus = useSelector((state: RootState) => state.login.loginResponse?.status);
  const location = useLocation();

  const getCredentials = getCredentialsFromLocalStorage();
  const getToken = getTokenFromLocalStorage();
  const getRefreshToken = getRefreshTokenFromLocalStorage();
  const credentials = JSON.parse(getCredentials);
  type CustomJwtPayload = JwtPayload & { exp: number; user_id: string; };

  // handle token (login social)

  const getInfoBySocialLogin = useMemo(() => {
    if (getToken) {
      const encodeToken = jwtDecode<CustomJwtPayload>(getToken);
      const { user_id: userID } = encodeToken;
      setDataFromLocalStorage(JSON.stringify({ status: 200, userID }));
      dispatch(loginSucess({ status: 200, userID }));
      dispatch(getUserProfile());
    }
  }, [getToken]);

  // handle token (login web)
  const handleExpired = () => {
    const token = jwtDecode<CustomJwtPayload>(getToken);
    const refreshToken = jwtDecode<CustomJwtPayload>(getRefreshToken);

    const expToken = checkExpired(token);
    const expRefreshToken = checkExpired(refreshToken);
    const payload = {
      refresh: getRefreshToken,
    };

    if (!expRefreshToken) { // refresh token < 30 days
      if (expToken) { // token > 7 days
        dispatch(refreshTokenAction(payload));
      }
    } else { // refresh token > 30 days
      dispatch(logOut());
      clearStoreFromlocalStorage();
      toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại !');
    }
  };
  // handle footer
  function handleFoooter() {
    if (!(location.pathname === ROUTE_REGISTER || location.pathname === ROUTE_LOGIN)) {
      return (
        <Footer />
      );
    }
    return null;
  }

  useEffect(() => {
    dispatch(getListCategoryAction());
    if (credentials) {
      dispatch(loginSucess(credentials));
      dispatch(getUserProfile());
      handleExpired();
    }
  }, [credentials]);

  useEffect(() => getInfoBySocialLogin, [getToken]);

  if (logoutStatus === 0) return <CircularProgress className='main-loading' />;

  return (
    <div className='App'>
      <Suspense fallback={<CircularProgress className='main-loading' />}>
        <HeaderMenu>
          <>
            <Switch>
              {routes.map((route, index) => (
                <RouteWithSubRoutes key={`${index + 0}`} {...route} />
              ))}
            </Switch>
            {handleFoooter()}
          </>
        </HeaderMenu>
      </Suspense>
    </div>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default App;
