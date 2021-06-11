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
}

const initialState: InitialState = {
  magazineMenu: {
    menu: '',
    id: 0,
  },
  categories: {},
  magazineList: {}
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
    }
  },
});

const { actions, reducer } = magazineSlice;
const { magazineMenu, categories, magazineList } = actions;

export { magazineMenu, categories, magazineList };
export default reducer;
