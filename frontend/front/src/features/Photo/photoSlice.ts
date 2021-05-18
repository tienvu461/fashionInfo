/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  photoList: {
    listPhoto: Array<Record<string, unknown>>;
    dataOrigin: Record<string, unknown>;
  };
}

const initialState: InitialState = {
  photoList: {
    listPhoto: [],
    dataOrigin: {},
  },
};

const photoSlice = createSlice({
  name: 'COUNTER_REDUCER',
  initialState,
  reducers: {
    getListPhoto: (state, { payload }) => {
      state.photoList = {
        listPhoto: payload.data.results,
        dataOrigin: { ...payload.data },
      };
    },
  },
});

const { actions, reducer } = photoSlice;
const { getListPhoto } = actions;
export { getListPhoto };

export default reducer;
