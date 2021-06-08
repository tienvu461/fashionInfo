/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  magazineMenu: {
    menu: string;
    id: number;
  };
}

const initialState: InitialState = {
  magazineMenu: {
    menu: '',
    id: 0
  }
};

const magazineSlice = createSlice({
  name: 'MAGAZINE_REDUCER',
  initialState,
  reducers: {
    magazineMenu: (state, action) => {
      state.magazineMenu = { ...action.payload };
    },
  },
});

const { actions, reducer } = magazineSlice;
const { magazineMenu } = actions;

export { magazineMenu };
export default reducer;
