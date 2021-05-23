/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOGIN_API, GET_AUTHEN_URL } from '../apis/index';
import request from '../configs/index';

export async function loginService(payload: any) {
    return (
        request(
            LOGIN_API,
            'POST',
            payload
        )
    );
}

export async function getUrlSocialService() {
    return (
        request(
            GET_AUTHEN_URL,
            'GET',
        )
    );
}
