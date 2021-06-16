/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-newline */
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
  photoLikes: Record<string, string>;
  photoComment: Record<string, string>;
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
  photoLikes: {},
  photoComment: {}
};

const photoSlice = createSlice({
  name: 'PHOTO_REDUCER',
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
    photoLikes: (state, { payload }) => {
      state.photoLikes = {
        ...payload.data
      };
    },
    photoComment: (state, { payload }) => {
      state.photoComment = {
        ...payload.data
      };
    }
  },
});

const { actions, reducer } = photoSlice;
const { getListPhoto, getPhotoDetail, getListPhotoSuggestion, photoLikes, photoComment } = actions;
export { getListPhoto, getPhotoDetail, getListPhotoSuggestion, photoLikes, photoComment };

export default reducer;
