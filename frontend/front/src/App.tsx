import React from 'react';

import './App.scss';
import HeaderMenu from './components/HeaderMenu';
import HomePage from './pages/HomePage';

function App(): JSX.Element {
  return (
    <div className='App'>
      <HeaderMenu>
        <HomePage />
      </HeaderMenu>
    </div>
  );
}

export default App;
