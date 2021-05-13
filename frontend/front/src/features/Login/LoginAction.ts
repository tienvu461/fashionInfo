import { Dispatch } from '@reduxjs/toolkit';
import { loginSucess } from './LoginSlice';
import { loginService } from '../../services/auth';
import { setDataFromLocalStorage, setTokenToLocalStorage } from '../../utils/localStorage';

export const loginAction = (payload: unknown) => async (dispatch: Dispatch) => {
        try {
            const response = await loginService(payload);
            console.log('LOGIN SUCCESS', response);
            const { data = {}, status = '' } = response;
            if (status === 200) {
                dispatch(loginSucess({ data, status }));
                console.log("RES", response);
                setDataFromLocalStorage(JSON.stringify(response));
                setTokenToLocalStorage(data.access);
                // toast.success('Đăng nhập Thành Công !!!');
            }
        } catch (error) {
            const { response: { data = {} } = {}, } = error;
            console.log('LOGIN ERROR', data);
            // dispatch(loginFail(data));
            // toast.error(data);
        }
    };
