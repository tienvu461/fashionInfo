/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';
import { AUTH_REDUCER } from 'src/constants';

interface InitialStateType {
  loginResponse: Record<string, string | number | Record<string, string>>;
}

const initialState: InitialStateType = {
  loginResponse: {},
};

const loginSlice = createSlice({
    name: AUTH_REDUCER.LOGIN,
    initialState,
    reducers: {
        loginSucess: (state, action) => {
            state.loginResponse = action.payload;
        },
        loginFail: (state, action) => {
            state.loginResponse = action.payload;
        },
        logoutSuccess: (state, action) => {
            state.loginResponse = action.payload;
        },
    }
});

const { actions, reducer } = loginSlice;
const { loginSucess, loginFail, logoutSuccess } = actions;

export { loginSucess, loginFail, logoutSuccess };
export default reducer;
