import { LOGIN_API } from '../apis/index';
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
