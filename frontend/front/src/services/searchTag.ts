/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SEARCH_TAG_PHOTO_API, SEARCH_TAG_MAGAZINE_API } from '../apis/index';
import request from '../configs/index';

export const searchTagPhotoService = (number: number | string, textSearch: string): any =>
  request(`${SEARCH_TAG_PHOTO_API}?page=${number}&search_text=${textSearch}`, 'GET');

export const searchTagMagazineService = (number: number | string, textSearch: string): any =>
  request(`${SEARCH_TAG_MAGAZINE_API}?page=${number}&search_text=${textSearch}`, 'GET');
