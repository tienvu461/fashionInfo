/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  photoList: {
    listPhoto: Array<any>;
    dataOrigin: Record<string, string>;
  };
  photoDetail: Record<any, any>;
}

const initialState: InitialState = {
  photoList: {
    listPhoto: [],
    dataOrigin: {},
  },
  photoDetail: {},
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

    getPhotoDetail: (state, { payload }) => {
      state.photoDetail = {
        ...payload.data,
      };
    },
  },
});

const { actions, reducer } = photoSlice;
const { getListPhoto, getPhotoDetail } = actions;
export { getListPhoto, getPhotoDetail };

export default reducer;
