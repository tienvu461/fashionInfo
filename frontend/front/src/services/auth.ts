/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOGIN_API, GET_AUTHEN_URL } from '../apis/index';
import request from '../configs/index';

type PayloadProps = {
  username: string;
  password: string;
  showPassword: boolean;
};

export const loginService = async (payload: PayloadProps): Promise<any> => request(LOGIN_API, 'POST', payload);

export const getUrlSocialService = async (): Promise<any> => request(GET_AUTHEN_URL, 'GET');
