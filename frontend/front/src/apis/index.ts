// HOST
export const HOST = 'http://api.tienvv.com';
// export const HOST = 'http://localhost:8000/';

// USER AUTH
export const LOGIN_API = `${HOST}/api/token`;
export const REFRESH_TOKEN_API = `${HOST}/api/jwt/refresh/`;
export const REGISTER = `${HOST}/api/users/`;
// SOCIAL AUTH
export const GET_AUTHEN_URL = `${HOST}/api/social/o/google-oauth2/?redirect_uri=${HOST}/accounts/profile/`;

// USER PROFILE
export const USER_PROFILE_API = `${HOST}/api/user/profile/`;

// SEARCH_TAG
export const SEARCH_TAG_API = `${HOST}/api/photos`;

// PHOTO
export const PHOTO_LIST_API = `${HOST}/api/photos/?page=`;
export const PHOTO_GET_BY_ID_API = `${HOST}/api/photos`;
export const PHOTO_LIST_SUGGEST_API = `${HOST}/api/photos/suggest?page=`;
export const PHOTO_LIKE_API = `${HOST}/api/photos/like`;
export const PHOTO_COMMENT_API = `${HOST}/api/photos/comment`;

// MAGAZINE
export const MAGAZINE_LIST_CATEGORY_API = `${HOST}/api/magazine/category`;
export const MAGAZINE_LIST_API = `${HOST}/api/magazine/?category=`;
export const MAGAZINE_DETAIL_API = `${HOST}/api/magazine`;
export const MAGAZINE_LIST_SUGGEST_API = `${HOST}/api/magazine/suggest?page=`;
export const MAGAZINE_LIKE_API = `${HOST}/api/magazine/like`;
export const MAGAZINE_COMMENT_API = `${HOST}/api/magazine/comment`;

// FEATURE PHOTO + MAGAZINE
export const FEARTURE_PHOTO_API = `${HOST}/api/photos/feature`;
export const FEARTURE_MAGAZINE_API = `${HOST}/api/magazine/feature`;
