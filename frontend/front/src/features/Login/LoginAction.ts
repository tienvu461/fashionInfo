import { Dispatch } from '@reduxjs/toolkit';
import { loginSucess, loginFail } from './LoginSlice';
import { loginService, getUrlSocialService } from '../../services/auth';
import { setDataFromLocalStorage, setTokenToLocalStorage } from '../../utils/localStorage';

export const loginAction = (payload: unknown) => async (dispatch: Dispatch) => {
        try {
            const response = await loginService(payload);
            // console.log('LOGIN SUCCESS', response);
            const { data = {}, status = '' } = response;
            if (status === 200) {
                dispatch(loginSucess({ data, status }));
                setDataFromLocalStorage(JSON.stringify(response));
                setTokenToLocalStorage(data.access);
                // console.log("RES", response);
            }
        } catch (error) {
            const { response: { data = {}, status = '' } = {}, } = error;
            dispatch(loginFail({ data, status }));
            // console.log('LOGIN ERROR', error);
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
