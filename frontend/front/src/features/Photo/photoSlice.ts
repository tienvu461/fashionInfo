/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  photoList: any;
}

const initialState: InitialState = {
  photoList: {},
};

const photoSlice = createSlice({
  name: 'COUNTER_REDUCER',
  initialState,
  reducers: {
    getListPhoto: (state, { payload }) => {
      state.photoList = {
        ...payload,
      };
    },
  },
});

const { actions, reducer } = photoSlice;
const { getListPhoto } = actions;
export { getListPhoto };

export default reducer;
