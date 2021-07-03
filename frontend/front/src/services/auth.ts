/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { LOGIN_API, REGISTER, GET_AUTHEN_URL, REFRESH_TOKEN_API, USER_PROFILE_API, FORGOTPASSWORD_API, COMFIRMPASSWORD_API } from '../apis/index';
import request from '../configs/index';

type PayloadType = {
  email: string;
  password: string;
  re_password?: string;
  showPassword?: boolean;
};

export const loginService = async (payload: PayloadType): Promise<any> => request(LOGIN_API, 'POST', payload);

export const registerService = async (payload: PayloadType): Promise<any> => request(REGISTER, 'POST', payload);

export const profileService = async (): Promise<any> => request(USER_PROFILE_API, 'GET');

export const getUrlSocialService = async (): Promise<any> => request(GET_AUTHEN_URL, 'GET');

export const refreshTokenService = async (payload: { refresh: string }): Promise<any> => request(REFRESH_TOKEN_API, 'POST', payload);

export const forgotPasswordService = async (payload: any): Promise<any> => request(FORGOTPASSWORD_API, 'POST', payload);

export const confirmPasswordService = async (payload: any): Promise<any> => request(COMFIRMPASSWORD_API, 'POST', payload);
