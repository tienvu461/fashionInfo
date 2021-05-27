/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import loginReducer from '../features/Login/LoginSlice';
import photoReducer from '../features/Photo/photoSlice';
import { clearStoreFromlocalStorage } from '../utils/localStorage';

const appReducer = combineReducers({
  login: loginReducer,
  photo: photoReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'CLEAR_STORE') {
    clearStoreFromlocalStorage();
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
