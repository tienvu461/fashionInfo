/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  featureList: Record<any, any>;
}

const initialState: InitialState = {
  featureList: {},
};

const featurePhotoSlice = createSlice({
  name: 'MAGAZINE_REDUCER',
  initialState,
  reducers: {
    featureList: (state, { payload }) => {
      state.featureList = payload;
    },
  },
});

const { actions, reducer } = featurePhotoSlice;
const { featureList } = actions;

export { featureList };
export default reducer;
