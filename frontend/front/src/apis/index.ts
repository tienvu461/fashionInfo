// HOST
export const HOST = 'http://api.tienvv.com';

// USER AUTH
export const LOGIN_API = `${HOST}/api/jwt/create`;

// SOCIAL AUTH
export const GET_AUTHEN_URL = `${HOST}/api/social/o/google-oauth2/?redirect_uri=${HOST}/accounts/profile/`;

// SEARCH_TAG
export const SEARCH_TAG_API = 'http://api.tienvv.com/api/photos'

// PHOTO
export const PHOTO_LIST_API = `${HOST}/api/photos/?page=`;
export const PHOTO_GET_BY_ID_API = `${HOST}/api/photos`;
export const PHOTO_LIST_SUGGEST_API = `${HOST}/api/photos/suggest?page=`;
