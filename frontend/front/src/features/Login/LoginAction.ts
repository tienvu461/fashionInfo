/* eslint-disable camelcase */
import { Dispatch } from '@reduxjs/toolkit';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { loginSucess, loginFail } from './LoginSlice';
import { loginService, getUrlSocialService } from '../../services/auth';
import { setDataFromLocalStorage, setTokenToLocalStorage } from '../../utils/localStorage';

export const loginAction = (payload: unknown) => async (dispatch: Dispatch) => {
        try {
            const response = await loginService(payload);
            console.log('Data login success', response);
            /**
             * TO DO ENOCODE JWT
             */
            const dataEncodeJwt = jwtDecode<any>(response.data.access);
            const { user_id } = dataEncodeJwt;
            const { data = {}, status = '' } = response;
            if (status === 200) {
                dispatch(loginSucess({ data, status, user_id }));
                setDataFromLocalStorage(JSON.stringify(response));
                setTokenToLocalStorage(data.access);
            }
        } catch (error) {
            const { response: { data = {}, status = '' } = {}, } = error;
            dispatch(loginFail({ data, status }));
        }
    };

export const getUrlSocialAction = () => async (dispatch: Dispatch) => {
    try {
        const response = await getUrlSocialService();
        const url = response.data.authorization_url
        const win = window.open(url, '_blank');
            if (win != null) {
                win.focus();
            }
    } catch (error) {
        console.log(error)
    }
}
