/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PHOTO_LIST_API, PHOTO_GET_BY_ID_API, PHOTO_LIST_SUGGEST_API, PHOTO_LIKE_API } from '../apis';
import request from '../configs/index';

export const getListPhoto = (page: number): any => request(`${PHOTO_LIST_API}${page}`, 'GET');

export const getPhotoById = (id: string): any => request(`${PHOTO_GET_BY_ID_API}/${id}`, 'GET');

export const getListSuggestionPhoto = (num: number, id: string): any => request(`${PHOTO_LIST_SUGGEST_API}${num}&photo_id=${id}`, 'GET');

export const likePhotoService = (payload: { user_id: string; photo_id: string | number}): Promise<any> => request(PHOTO_LIKE_API, 'POST', payload);
