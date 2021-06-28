import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable @typescript-eslint/no-explicit-any */
interface InitialSate {
    dataSearch: {
        listPhoto: Array<any>;
        dataOrigin: Record<string, any>;
    };
    textSearch: string;
}

const initialState: InitialSate = {
    dataSearch: {
        listPhoto: [],
        dataOrigin: {},
    },
    textSearch: ''
};

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
        },
        textSearch: (state, { payload }) => {
            state.textSearch = payload;
        }
}
});

const { actions, reducer } = searchTagSlice;
const { getDataSearch, textSearch } = actions;
export { getDataSearch, textSearch };

export default reducer;
