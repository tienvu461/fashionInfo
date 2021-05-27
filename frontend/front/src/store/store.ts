/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import loginReducer from '../features/Login/LoginSlice';
import photoReducer from '../features/Photo/photoSlice';
import searchTagReducer from '../features/Search/searchSlide';

const appReducer = combineReducers({
  login: loginReducer,
  photo: photoReducer,
  searchTag: searchTagReducer,
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
