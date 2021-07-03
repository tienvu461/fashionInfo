/* =============* LOCALSTORAGE KEY CONSTANTS *============= */
const LOCAL_STORAGE_TOKEN_KEY = '@token';
const REFRESH_TOKEN_KEY = '@refreshToken';
const LOCAL_STORAGE_CREDENTIALS_KEY = '@credentials';
export { LOCAL_STORAGE_TOKEN_KEY, LOCAL_STORAGE_CREDENTIALS_KEY };

/* =============* REDUCER + ACTION *============= */
const AUTH_REDUCER = {
  LOGIN: 'login',
  PROFILE: 'profile'
};
export { AUTH_REDUCER };

/* =============* ROUTE LINKS *============= */
const ROUTE_HOME = '/';
const ROUTE_LOGIN = '/login';
const ROUTE_PHOTO = '/photo';
const ROUTE_PROFILE = '/profile';
const ROUTE_REGISTER = '/register';
const ROUTE_FORGOTPASSWORD = '/forgotpassword';
const ROUTE_MAGAZINE_DETAIL = '/magazine';
const ROUTE_PHOTO_SEARCH = '/photo/search/:nameTag';
const ROUTE_FORUM = '/forum';

export {
  ROUTE_HOME,
  ROUTE_REGISTER,
  ROUTE_LOGIN,
  ROUTE_FORGOTPASSWORD,
  ROUTE_PROFILE,
  ROUTE_PHOTO,
  ROUTE_PHOTO_SEARCH,
  ROUTE_FORUM,
  REFRESH_TOKEN_KEY,
  ROUTE_MAGAZINE_DETAIL,
};
