/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';
import { AUTH_REDUCER } from 'src/constants';

interface InitialStateType {
  loginResponse: Record<string, string | number | Record<string, string>>;
  isLoginToComment: {
    isComment: boolean;
    paramId: string | null;
    key: string;
  };
}

const initialState: InitialStateType = {
  loginResponse: {},
  isLoginToComment: {
    isComment: false,
    paramId: null,
    key: ''
  },
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
    isLoginToComment: (state, { payload }) => {
      state.isLoginToComment = {
        isComment: payload.isComment,
        paramId: payload.paramId,
        key: payload.key
      };
    },
  },
});

const { actions, reducer } = loginSlice;
const { loginSucess, loginFail, logoutSuccess, isLoginToComment } = actions;

export { loginSucess, loginFail, logoutSuccess, isLoginToComment };
export default reducer;
