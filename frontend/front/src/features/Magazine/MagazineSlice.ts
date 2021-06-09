/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  magazineMenu: {
    menu: string;
    id: number;
  };
  categories: Record<string, any>
}

const initialState: InitialState = {
  magazineMenu: {
    menu: '',
    id: 0,
  },
  categories: {},
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
    }
  },
});

const { actions, reducer } = magazineSlice;
const { magazineMenu, categories } = actions;

export { magazineMenu, categories };
export default reducer;
