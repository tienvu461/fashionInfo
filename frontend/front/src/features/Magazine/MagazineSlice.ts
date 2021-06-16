/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  magazineMenu: {
    menu: string;
    id: number;
  };
  categories: Record<string, any>;
  magazineList: Record<string, string>;
  suggesMagazineList: Record<string, string>;
}

const initialState: InitialState = {
  magazineMenu: {
    menu: '',
    id: 0,
  },
  categories: {},
  magazineList: {},
  suggesMagazineList: {}
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
    suggesMagazineList: (state, action) => {
      state.suggesMagazineList = action.payload;
    }
  },
});

const { actions, reducer } = magazineSlice;
const { magazineMenu, categories, magazineList, suggesMagazineList } = actions;

export { magazineMenu, categories, magazineList, suggesMagazineList };
export default reducer;
