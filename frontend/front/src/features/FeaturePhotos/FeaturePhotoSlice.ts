/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  featureListPhoto: Record<any, any>;
  featureListMagazine: Record<any, any>;
}

const initialState: InitialState = {
  featureListPhoto: {},
  featureListMagazine: {},
};

const featurePhotoSlice = createSlice({
  name: 'MAGAZINE_REDUCER',
  initialState,
  reducers: {
    featureListPhoto: (state, { payload }) => {
      state.featureListPhoto = payload;
    },
    featureListMagazine: (state, { payload }) => {
      state.featureListMagazine = payload;
    },
  },
});

const { actions, reducer } = featurePhotoSlice;
const { featureListPhoto, featureListMagazine } = actions;

export { featureListPhoto, featureListMagazine };
export default reducer;
