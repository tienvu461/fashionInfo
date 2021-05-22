import { createSlice } from '@reduxjs/toolkit';

interface InitialSate {
    tempInitialState: any
}

const initialState: InitialSate = {
    tempInitialState: {}
}

const searchTagSlice = createSlice({
    name: 'SEARCHTAG_REDUCER',
    initialState,
    reducers: { getDataSearch: (state, { payload }) => { state.tempInitialState = payload; } }
})

const { actions, reducer } = searchTagSlice;
const { getDataSearch } = actions;
export { getDataSearch };

export default reducer;
