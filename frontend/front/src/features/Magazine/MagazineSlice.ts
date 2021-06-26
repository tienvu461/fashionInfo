/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  magazineMenu: {
    menu: string;
    id: number;
  };
  categories: Record<string, any>;
  magazineList: Record<string, any>;
  magazineDetail: Record<string, any>;
  magazineListSuggest: Record<string, any>;
  magazineLikes: Record<string, string>;
  magazineComment: Record<string, string>;
}

const initialState: InitialState = {
  magazineMenu: {
    menu: '',
    id: 0,
  },
  categories: {},
  magazineList: {},
  magazineDetail: {},
  magazineListSuggest: {},
  magazineLikes: {},
  magazineComment: {},
};

const magazineSlice = createSlice({
  name: 'MAGAZINE_REDUCER',
  initialState,
  reducers: {
    magazineMenu: (state, action) => {
      state.magazineMenu = { ...action.payload };
    },
    categories: (state, action) => {
      state.categories = action.payload;
    },
    magazineList: (state, action) => {
      state.magazineList = action.payload;
    },
    magazineDetail: (state, action) => {
      state.magazineDetail = action.payload;
    },
    magazineListSuggest: (state, action) => {
      state.magazineListSuggest = action.payload;
    },
    magazineLikes: (state, { payload }) => {
      state.magazineLikes = { ...payload.data };
    },
    magazineComment: (state, { payload }) => {
      state.magazineComment = { ...payload.data };
    },
  },
});

const { actions, reducer } = magazineSlice;
const { magazineMenu, categories, magazineList, magazineListSuggest, magazineDetail, magazineLikes, magazineComment } = actions;

export { magazineMenu, categories, magazineList, magazineListSuggest, magazineDetail, magazineLikes, magazineComment };
export default reducer;
