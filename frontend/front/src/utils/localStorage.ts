/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_CREDENTIALS_KEY, REFRESH_TOKEN_KEY } from '../constants';

// set credentials
export const setDataFromLocalStorage = (data: string): void => localStorage.setItem(LOCAL_STORAGE_CREDENTIALS_KEY, data);

// get credentials
export const getCredentialsFromLocalStorage = (): any => {
  const data = localStorage.getItem(LOCAL_STORAGE_CREDENTIALS_KEY);
  return data;
};

// set token
export const setTokenToLocalStorage = (token: string): void => localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
export const setRefreshTokenToLocalStorage = (token: string): void => localStorage.setItem(REFRESH_TOKEN_KEY, token);

// get token
export const getTokenFromLocalStorage = (): any => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    return token;
};
// get token
export const getRefreshTokenFromLocalStorage = (): any => {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY);
    return token;
};

// clear localstorage
export const clearStoreFromlocalStorage = ():any => {
  localStorage.clear();
  return 1;
};
