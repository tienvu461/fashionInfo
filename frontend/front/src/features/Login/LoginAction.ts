/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from '@reduxjs/toolkit';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import {
  clearStoreFromlocalStorage,
  setDataFromLocalStorage,
  setTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from 'src/utils/localStorage';

import { loginService, getUrlSocialService, refreshTokenService } from 'src/services/auth';
import { loginSucess, loginFail, logoutSuccess } from './LoginSlice';

export const loginAction = (payload: {
  username: string; password: string, showPassword: boolean
}) => async (dispatch: Dispatch): Promise<any> => {
        try {
            const response = await loginService(payload);
            /**
             * TO DO ENOCODE JWT
             */
            type CustomJwtPayload = JwtPayload & { user_id: string };
            const dataEncodeJwt = jwtDecode<CustomJwtPayload>(response.data.access);
            const { user_id: userID } = dataEncodeJwt;
            const { data = {}, status = '' } = response;
            if (status === 200) {
                dispatch(loginSucess({ data, status, userID }));
                setDataFromLocalStorage(JSON.stringify({ status, userID }));
                setTokenToLocalStorage(data.access);
                setRefreshTokenToLocalStorage(data.refresh);
            }
        } catch (error) {
            const { response: { data = {}, status = '' } = {}, } = error;
            dispatch(loginFail({ data, status }));
        }
    };

// clear localstorage
export const logoutAction = () => async (dispatch: Dispatch): Promise<any> => {
   try {
    clearStoreFromlocalStorage();
    dispatch(logoutSuccess);
    // toast.success('Đăng xuất thành công');
   } catch (e) {
    //    console.log(e);
   }
};

// export const getUrlSocialAction = () => async (dispatch: Dispatch) => {
//     try {
//       const response = await loginService(payload);
//       // console.log('LOGIN SUCCESS', response);
//       const { data = {}, status = '' } = response;
//       if (status === 200) {
//         dispatch(loginSucess({ data, status }));
//         setDataFromLocalStorage(JSON.stringify(response));
//         setTokenToLocalStorage(data.access);
//         // console.log("RES", response);
//       }
//     } catch (error) {
//       const { response: { data = {}, status = '' } = {} } = error;
//       dispatch(loginFail({ data, status }));
//       // console.log('LOGIN ERROR', error);
//     }
//   };

export const getUrlSocialAction = () => async (): Promise<any> => {
  try {
    const response = await getUrlSocialService();
    const url = response.data.authorization_url;
    const win = window.open(url, '_blank');
    if (win != null) {
      win.focus();
    }
  } catch (error) {
    // console.log(error);
  }
};

export const refreshTokenAction = (payload: { refresh: string}) => async (dispatch: Dispatch): Promise<any> => {
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
    console.log(error);
  }
};
