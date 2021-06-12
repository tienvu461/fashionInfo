/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import loginReducer from '../features/Login/LoginSlice';
import registerReducer from '../features/Register/RegisterSlice';
import photoReducer from '../features/Photo/photoSlice';
import profileReducer from '../features/Profile/ProfileSlice';
import magazineReducer from '../features/Magazine/MagazineSlice';
import { clearStoreFromlocalStorage } from '../utils/localStorage';
import searchTagReducer from '../features/Search/searchSlide';

const appReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  profile: profileReducer,
  photo: photoReducer,
  magazine: magazineReducer,
  searchTag: searchTagReducer,
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
