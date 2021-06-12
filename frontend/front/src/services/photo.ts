/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'src/configs';
import {
  PHOTO_LIST_API,
  PHOTO_GET_BY_ID_API,
  PHOTO_LIST_SUGGEST_API,
  PHOTO_LIKE_API,
  PHOTO_COMMENT_API,
} from 'src/apis';

export const getListPhoto = (page: number): any => request(`${PHOTO_LIST_API}${page}`, 'GET');

export const getPhotoById = (id: string): any => request(`${PHOTO_GET_BY_ID_API}/${id}`, 'GET');

export const getListSuggestionPhoto = (num: number, id: string): any => request(`${PHOTO_LIST_SUGGEST_API}${num}&photo_id=${id}`, 'GET');

export const likePhotoService = (payload: { user_id: string; photo_id: string | number}): Promise<any> => request(PHOTO_LIKE_API, 'POST', payload);

export const commentPhotoService = (payload: {
  user_id: string;
  photo_id: string | number;
  content: string;
  parent: null | number;
}): Promise<any> => request(PHOTO_COMMENT_API, 'POST', payload);
