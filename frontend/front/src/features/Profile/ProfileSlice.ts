/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';
import { AUTH_REDUCER } from 'src/constants';

interface InitialState {
  currentUser: Record<string, string>;
}

const initialState: InitialState = {
    currentUser: {}
};

const profileSlice = createSlice({
  name: AUTH_REDUCER.PROFILE,
  initialState,
  reducers: {
    // contains reducerfunction name
    storeProfile: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

const { actions, reducer } = profileSlice;
const { storeProfile } = actions;

export { storeProfile };
export default reducer;
