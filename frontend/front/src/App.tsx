/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, Suspense, lazy } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import './App.scss';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';

import {
  ROUTE_FORUM,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_REGISTER,
  ROUTE_PHOTO,
  ROUTE_PHOTO_SEARCH,
} from './constants';
import {
  clearStoreFromlocalStorage,
  getCredentialsFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  getTokenFromLocalStorage,
  setDataFromLocalStorage
} from './utils/localStorage';

import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import ForumPage from './pages/ForumPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
import MagazinePage from './pages/MagaginzePage';
import HeaderMenu from './components/HeaderMenu';
import PhotoSearchPage from './pages/PhotoSearchPage';
import { loginSucess } from './features/Login/LoginSlice';
import DetailPhoto from './pages/PhotoPage/components/Detail';
import { getUserProfile } from './features/Profile/ProfileAction';
import { refreshTokenAction } from './features/Login/LoginAction';

const PhotoPage = lazy(() => import('./pages/PhotoPage'));

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
    console.log('login response');
    console.log('getCredentials: ', getCredentials);
    console.log('credentials: ', credentials);
    if (credentials) {
      dispatch(loginSucess(credentials));
      dispatch(getUserProfile());
      handleExpired();
    }
  }, [getToken, getCredentials]);

  useEffect(() => getInfoBySocialLogin, [getToken]);

  return (
    <div className='App'>
      <Suspense fallback={<CircularProgress className='main-loading' />}>
        <HeaderMenu>
          <Switch>
            <Route component={PhotoPage} exact path={ROUTE_PHOTO} />
            <Route component={PhotoSearchPage} exact path={ROUTE_PHOTO_SEARCH} />
            <Route component={DetailPhoto} exact path={`${ROUTE_PHOTO}/:id`} />
            <Route component={MagazinePage} exact path={ROUTE_HOME} />
            <Route component={ForumPage} exact path={ROUTE_FORUM} />
            <Route component={RegisterPage} exact path={ROUTE_REGISTER} />
            <Route component={LoginPage} exact path={ROUTE_LOGIN} />
            <Route component={NotFound} />
          </Switch>
        </HeaderMenu>
        {handleFoooter()}
      </Suspense>
    </div>
  );
}

export default App;
