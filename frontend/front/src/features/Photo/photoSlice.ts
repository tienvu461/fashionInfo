/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  photoList: {
    listPhoto: Array<Record<string, string>>;
    dataOrigin: Record<string, string>;
  };
  photoDetail: Record<string, any>;
  photoSuggestionList: {
    listPhoto: Array<Record<string, string>>;
    dataOrigin: Record<string, string>;
  };
}

const initialState: InitialState = {
  photoList: {
    listPhoto: [],
    dataOrigin: {},
  },
  photoDetail: {},
  photoSuggestionList: {
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

    getPhotoDetail: (state, { payload }) => {
      state.photoDetail = {
        ...payload.data,
      };
    },

    getListPhotoSuggestion: (state, { payload }) => {
      state.photoSuggestionList = {
        listPhoto: payload.data.results,
        dataOrigin: { ...payload.data },
      };
    },
  },
});

const { actions, reducer } = photoSlice;
const { getListPhoto, getPhotoDetail, getListPhotoSuggestion } = actions;
export { getListPhoto, getPhotoDetail, getListPhotoSuggestion };

export default reducer;
