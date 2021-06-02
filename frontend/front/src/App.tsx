/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import jwtDecode, { JwtPayload } from 'jwt-decode';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import HeaderMenu from './components/HeaderMenu';
import {
  ROUTE_FORUM,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_PHOTO,
  ROUTE_PHOTO_SEARCH,
} from './constants';
import ForumPage from './pages/ForumPage';
import PhotoPage from './pages/PhotoPage';
import PhotoSearchPage from './pages/PhotoSearchPage';
import LoginPage from './pages/LoginPage';
import MagazinePage from './pages/MagaginzePage';
import NotFound from './pages/NotFound';
import DetailPhoto from './pages/PhotoPage/components/Detail';
import Footer from './components/Footer';

import {
  clearStoreFromlocalStorage,
  getCredentialsFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  getTokenFromLocalStorage } from './utils/localStorage';
import { loginSucess } from './features/Login/LoginSlice';
import { refreshTokenAction } from './features/Login/LoginAction';

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

  const getCredentials = getCredentialsFromLocalStorage();
  const getToken = getTokenFromLocalStorage();
  const getRefreshToken = getRefreshTokenFromLocalStorage();

  const credentials = JSON.parse(getCredentials);

  const handleAuth = () => {
    type CustomJwtPayload = JwtPayload & { exp: number };
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

  useEffect(() => {
    if (credentials) {
      dispatch(loginSucess(credentials));
      handleAuth();
    }
  }, []);

  return (
    <div className='App'>
      <HeaderMenu>
        <Switch>
          <Route component={PhotoPage} exact path={ROUTE_PHOTO} />
          <Route component={PhotoSearchPage} exact path={ROUTE_PHOTO_SEARCH} />
          <Route component={DetailPhoto} exact path={`${ROUTE_PHOTO}/:id`} />
          <Route component={MagazinePage} exact path={ROUTE_HOME} />
          <Route component={ForumPage} exact path={ROUTE_FORUM} />
          <Route component={LoginPage} exact path={ROUTE_LOGIN} />
          <Route component={NotFound} />
        </Switch>
      </HeaderMenu>
      <Footer />
    </div>
  );
}

export default App;
