import { createSlice } from '@reduxjs/toolkit';
import { AUTH_REDUCER } from '../../constants';

const loginSlice = createSlice({
    name: AUTH_REDUCER.LOGIN,
    initialState: {
        loginResponse: {}
    },
    reducers: {
        // contains reducerfunction name
        loginSucess: (state, action) => {
            state.loginResponse = action.payload;
        },
        loginFail: (state, action) => {
            state.loginResponse = action.payload;
        },
        logoutSuccess: (state, { payload }) => {
            state.loginResponse = {
                status: 0,
                response: {}
            };
        },
    }
});

const { actions, reducer } = loginSlice;
const { loginSucess, loginFail, logoutSuccess } = actions;

export { loginSucess, loginFail, logoutSuccess };
export default reducer;
