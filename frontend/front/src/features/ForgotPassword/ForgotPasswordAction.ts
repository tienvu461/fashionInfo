/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */

import { toast } from 'react-toastify';
import { forgotPasswordService, confirmPasswordService } from 'src/services/auth';

interface FiledFormikForgot {
    email: string,
}

interface FiledFormikConfirm {
    uid: string,
    token: string,
    new_password: string,
    re_new_password: string,
}

export const forgotPasswordAction = (email: FiledFormikForgot) => async (): Promise<any> => {
    try {
        const response = await forgotPasswordService(email);
        const { status = '' } = response;
        if (status === 204) {
            toast.success('Hãy đăng nhập email để đổi mật khẩu');
        }
        return status;
    } catch (error) {
        toast.error('Đã xảy ra lỗi khi thay đổi mật khẩu, Hãy thử lại');
    }
    return 0;
};

export const confirmPasswordAction = (data: FiledFormikConfirm) => async (): Promise<any> => {
    try {
        const response = await confirmPasswordService(data);
        const { status = '' } = response;
        if (status === 204) {
            toast.success('Đổi mật khẩu thành công');
        }
        return status;
    } catch (error) {
        toast.error('Đã xảy ra lỗi khi xác nhận mật khẩu mới, Hãy thử lại');
    }
    return 0;
};
