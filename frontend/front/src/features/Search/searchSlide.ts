import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable @typescript-eslint/no-explicit-any */
interface InitialSate {
    dataSearch: {
        listPhoto: Array<any>;
        dataOrigin: Record<string, string>;
    }
}

const initialState: InitialSate = {
    dataSearch: {
        listPhoto: [],
        dataOrigin: {},
    }
}

// function removeKeyinObject(object, value) {
//     delete object[value]
//     return object
// }
// removeKeyinObject({ ...payload.data }, 'results'),

const searchTagSlice = createSlice({
    name: 'SEARCHTAG_REDUCER',
    initialState,
    reducers: {
        getDataSearch: (state, { payload }) => {
        state.dataSearch = {
            listPhoto: payload.data.results,
            dataOrigin: { ...payload.data },
        };
    }
}
})

const { actions, reducer } = searchTagSlice;
const { getDataSearch } = actions;
export { getDataSearch };

export default reducer;
