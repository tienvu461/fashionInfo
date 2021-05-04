/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import demoReducer from '../features/Demo/demoSlice';

const appReducer = combineReducers({
  demo: demoReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'CLEAR_STORE') {
    //   clearStoreFromlocalStorage();
    state = undefined;
  }

  // return reducer
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
