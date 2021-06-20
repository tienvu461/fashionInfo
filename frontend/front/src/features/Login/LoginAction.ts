/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from '@reduxjs/toolkit';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { toast } from 'react-toastify';
import {
  clearStoreFromlocalStorage,
  setDataFromLocalStorage,
  setTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from 'src/utils/localStorage';

import { loginService, getUrlSocialService, refreshTokenService } from 'src/services/auth';
import { loginSucess, loginFail, logoutSuccess } from './LoginSlice';

export const loginAction = (payload: {
  email: string; password: string
}) => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await loginService(payload);
    type CustomJwtPayload = JwtPayload & { user_id: string };
    const dataEncodeJwt = jwtDecode<CustomJwtPayload>(response.data.access);
    const { user_id: userID } = dataEncodeJwt;
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(loginSucess({ data, status, userID }));
      setDataFromLocalStorage(JSON.stringify({ status, userID }));
      setTokenToLocalStorage(data.access);
      setRefreshTokenToLocalStorage(data.refresh);
      toast.success('Đăng nhập thành công !');
    }
    return status;
  } catch (error) {
    const { response: { data = {}, status = '' } = {}, } = error;
    dispatch(loginFail({ data, status }));
  }

  return 0;
};

// clear localstorage
export const logoutAction = () => async (dispatch: Dispatch): Promise<any> => {
  try {
    clearStoreFromlocalStorage();
    dispatch(logoutSuccess);
  } catch (e) {
    // console.log(e);
  }
};

export const getUrlSocialAction = () => async (): Promise<any> => {
  try {
    const response = await getUrlSocialService();
    const url = response.data.authorization_url;

    window.location.replace(url);
    // const win = window.open(url, '_blank');
    // if (win != null) {
    //   win.focus();
    // }
  } catch (error) {
    // console.log(error);
  }
};

export const refreshTokenAction = (payload: { refresh: string }) => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await refreshTokenService(payload);
    type CustomJwtPayload = JwtPayload & { user_id: string };
    const dataEncodeJwt = jwtDecode<CustomJwtPayload>(response.data.access);
    const { user_id: userID } = dataEncodeJwt;
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(loginSucess({ data, status, userID }));
      setDataFromLocalStorage(JSON.stringify({ data, status, userID }));
      setTokenToLocalStorage(data.access);
    }
  } catch (error) {
    // console.log(error);
  }
};
