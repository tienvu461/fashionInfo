/* eslint-disable implicit-arrow-linebreak */
import { SEARCH_TAG_API } from '../apis/index';
import { request } from '../configs/index';

export const searchTagService: any = (textSearch: string) =>
  request(`${SEARCH_TAG_API}/search?search_text=${textSearch}`, 'GET');
