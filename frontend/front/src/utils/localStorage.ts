/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_CREDENTIALS_KEY } from '../constants';

// set credentials
export const setDataFromLocalStorage = (data: any) => localStorage.setItem(LOCAL_STORAGE_CREDENTIALS_KEY, data);

// set token
export const setTokenToLocalStorage = (token: any) => localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

// get token
export const getDataFromLocalStorage = () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    return token;
};
