"use strict";
exports.__esModule = true;
exports.PHOTO_COMMENT_API = exports.PHOTO_LIKE_API = exports.PHOTO_LIST_SUGGEST_API = exports.PHOTO_GET_BY_ID_API = exports.PHOTO_LIST_API = exports.SEARCH_TAG_API = exports.GET_AUTHEN_URL = exports.REFRESH_TOKEN_API = exports.LOGIN_API = exports.HOST = void 0;
// HOST
exports.HOST = 'http://api.tienvv.com';
// USER AUTH
exports.LOGIN_API = exports.HOST + "/api/jwt/create";
exports.REFRESH_TOKEN_API = exports.HOST + "/api/jwt/refresh/";
// SOCIAL AUTH
exports.GET_AUTHEN_URL = exports.HOST + "/api/social/o/google-oauth2/?redirect_uri=" + exports.HOST + "/accounts/profile/";
// SEARCH_TAG
exports.SEARCH_TAG_API = 'http://api.tienvv.com/api/photos';
// PHOTO
exports.PHOTO_LIST_API = exports.HOST + "/api/photos/?page=";
exports.PHOTO_GET_BY_ID_API = exports.HOST + "/api/photos";
exports.PHOTO_LIST_SUGGEST_API = exports.HOST + "/api/photos/suggest?page=";
exports.PHOTO_LIKE_API = exports.HOST + "/api/photos/like";
exports.PHOTO_COMMENT_API = exports.HOST + "/api/photos/comment";
