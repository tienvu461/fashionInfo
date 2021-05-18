import { Dispatch } from '@reduxjs/toolkit';
import { loginSucess, loginFail } from './LoginSlice';
import { loginService } from '../../services/auth';
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
