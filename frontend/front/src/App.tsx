import React from 'react';
import logo from './assets/images/brand.svg';
import './App.scss';

function App(): JSX.Element {
  return (
    <div className='App'>
      <header className='App-header'>
        <img alt='logo' src={logo} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          rel='noopener noreferrer'
          target='_blank'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
