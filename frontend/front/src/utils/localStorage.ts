import { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_CREDENTIALS_KEY } from '../constants';

// set credentials
export const setDataFromLocalStorage = (data: string): void => localStorage.setItem(LOCAL_STORAGE_CREDENTIALS_KEY, data);

// set token
export const setTokenToLocalStorage = (token: string): void => localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

// get token
export const getDataFromLocalStorage = (): string | null => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    return token;
};
// clear localstorage
export const clearStoreFromlocalStorage = () => localStorage.clear();
