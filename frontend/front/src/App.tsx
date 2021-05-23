/* eslint-disable import/no-unresolved */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import HeaderMenu from './components/HeaderMenu';
import {
  ROUTE_FORUM,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_PHOTO,
  // ROUTE_MAGAZINE,
} from './constants';
import ForumPage from './pages/ForumPage';
import PhotoPage from './pages/PhotoPage';
import LoginPage from './pages/LoginPage';
import MagazinePage from './pages/MagaginzePage';
import NotFound from './pages/NotFound';
import Detail from './pages/PhotoPage/components/Photos/Detail';

toast.configure({
  autoClose: 2000
});

function App(): JSX.Element {
  return (
    <div className='App'>
      <HeaderMenu>
        <Switch>
          <Route component={PhotoPage} exact path={ROUTE_PHOTO} />
          <Route component={Detail} exact path={`${ROUTE_PHOTO}/:id`} />
          <Route component={MagazinePage} exact path={ROUTE_HOME} />
          <Route component={ForumPage} exact path={ROUTE_FORUM} />
          <Route component={LoginPage} exact path={ROUTE_LOGIN} />
          <Route component={NotFound} />
        </Switch>
      </HeaderMenu>
    </div>
  );
}

export default App;
