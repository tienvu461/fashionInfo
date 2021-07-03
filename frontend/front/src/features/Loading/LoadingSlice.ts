/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';

interface InitialStateType {
  isLoading: boolean;
}

const initialState: InitialStateType = {
  isLoading: false,
};

const loginSlice = createSlice({
  name: 'LOADING',
  initialState,
  reducers: {
    loadingResponse: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const { actions, reducer } = loginSlice;
const { loadingResponse } = actions;

export { loadingResponse };
export default reducer;
