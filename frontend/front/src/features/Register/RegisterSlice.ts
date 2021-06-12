/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';

interface InitialSateType {
    registerResponse: Record<string, string | number | Record<string, string>>;
}

const initialState: InitialSateType = {
    registerResponse: {},
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerSucess: (state, action) => {
            state.registerResponse = action.payload;
        },
        registerFail: (state, action) => {
            state.registerResponse = action.payload;
        }
    }

});

const { actions, reducer } = registerSlice;
const { registerSucess, registerFail } = actions;

export { registerSucess, registerFail };
export default reducer;
