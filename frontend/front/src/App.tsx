import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import HeaderMenu from './components/HeaderMenu';
import ForumPage from './pages/ForumPage';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import NotFound from './pages/NotFound';

function App(): JSX.Element {
  return (
    <div className='App'>
      <HeaderMenu>
        <Switch>
          <Route component={HomePage} exact path='/' />
          <Route component={NewsPage} exact path='/news' />
          <Route component={ForumPage} exact path='/forum' />
          <Route component={NotFound} />
        </Switch>
      </HeaderMenu>
    </div>
  );
}

export default App;
