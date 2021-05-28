/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from '@reduxjs/toolkit';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { loginSucess, loginFail, logoutSuccess } from './LoginSlice';
import { loginService, getUrlSocialService } from '../../services/auth';
import { clearStoreFromlocalStorage, setDataFromLocalStorage, setTokenToLocalStorage } from '../../utils/localStorage';

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
                setDataFromLocalStorage(JSON.stringify({ data, status, userID }));
                setTokenToLocalStorage(data.access);
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
