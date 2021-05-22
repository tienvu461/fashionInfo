/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable implicit-arrow-linebreak */
import { PHOTO_LIST_API, PHOTO_GET_BY_ID_API, PHOTO_LIST_SUGGEST_API } from '../apis';
import request from '../configs/index';

export const getListPhoto: any = (page: number) => request(`${PHOTO_LIST_API}${page}`, 'GET');

export const getPhotoById: any = (id: string) => request(`${PHOTO_GET_BY_ID_API}/${id}`, 'GET');

export const getListSuggestionPhoto: any = (num: number, id: string) =>
  request(`${PHOTO_LIST_SUGGEST_API}${num}&photo_id=${id}`, 'GET');
