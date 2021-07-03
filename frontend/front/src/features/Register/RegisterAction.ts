/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { registerService } from 'src/services/auth';
import { registerSucess } from './RegisterSlice';

export const registerAction = (payload: {
    email: string; password: string; re_password: string
}) => async (dispatch: Dispatch): Promise<any> => {
    try {
        const response = await registerService(payload);
        // console.log("RESPONE- REGISTER", response);
        const { status = '' } = response;
        if (status === 201) {
            dispatch(registerSucess({ status }));
            toast.success('Đăng ký thành công, vui lòng kích hoạt email!');
            dispatch(registerSucess(0));
        }
    } catch (error) {
        // dispatch(registerFail(error.response.data));
        toast.error(`${error.response.data.email}`);
    }
    return 0;
};
