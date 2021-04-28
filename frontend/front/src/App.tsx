import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import logo from './assets/images/brand.svg';
import { decrement, increment } from './features/Demo/demoSlice';
import './App.scss';

interface RootState {
  demo: {
    value: string;
  };
}

function App(): JSX.Element {
  const count = useSelector((state: RootState) => state.demo.value);
  const dispatch = useDispatch();
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
        <div>
          <button
            aria-label='Increment value'
            onClick={() => dispatch(increment())}
            type='button'
          >
            +
          </button>
          <span>{count}</span>
          <button
            aria-label='Decrement value'
            onClick={() => dispatch(decrement())}
            type='button'
          >
            -
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
