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
  photoComment: {
    isComment: boolean;
    photoId: string | null;
  }
  photoLikes: Record<string, string>
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
  photoComment: {
    isComment: false,
    photoId: null
  },
  photoLikes: {}
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
    photoComment: (state, { payload }) => {
      state.photoComment = {
        isComment: payload.isComment,
        photoId: payload.photoId
      };
    },
    photoLikes: (state, { payload }) => {
      state.photoLikes = {
        ...payload.data
      };
    }
  },
});

const { actions, reducer } = photoSlice;
const { getListPhoto, getPhotoDetail, getListPhotoSuggestion, photoComment, photoLikes } = actions;
export { getListPhoto, getPhotoDetail, getListPhotoSuggestion, photoComment, photoLikes };

export default reducer;
