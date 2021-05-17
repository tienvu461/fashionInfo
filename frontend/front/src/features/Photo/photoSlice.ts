/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  photoOrigin: any;
  photoList: Array<Record<string, unknown>>;
}

const initialState: InitialState = {
  photoOrigin: {},
  photoList: [],
};

const photoSlice = createSlice({
  name: 'COUNTER_REDUCER',
  initialState,
  reducers: {
    getListPhoto: (state, { payload }) => {
      state.photoOrigin = {
        ...payload,
      };
      state.photoList = {
        ...payload.data,
      };
    },
  },
});

const { actions, reducer } = photoSlice;
const { getListPhoto } = actions;
export { getListPhoto };

export default reducer;
