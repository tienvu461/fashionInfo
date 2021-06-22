/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import {
  MAGAZINE_LIST_CATEGORY_API,
  MAGAZINE_LIST_API,
  MAGAZINE_LIST_SUGGEST_API,
  MAGAZINE_DETAIL_API,
  MAGAZINE_LIKE_API,
  MAGAZINE_COMMENT_API,
} from 'src/apis';
import request from 'src/configs';

export const getListCategory = (): any => request(MAGAZINE_LIST_CATEGORY_API, 'GET');

export const getListMagazine = (cat: string, num: number): any => request(`${MAGAZINE_LIST_API}${cat}&page=${num}`, 'GET');

export const getListSuggestMagazine = (num: number, id: number): any => request(`${MAGAZINE_LIST_SUGGEST_API}${num}&magazine_id=${id}`, 'GET');

export const getDetailMagazineCard = (id: number): any => request(`${MAGAZINE_DETAIL_API}/${id}`, 'GET');

export const likeMagazineService = (payload: { user_id: string; magazine_id: string | number }): Promise<any> => {
  return request(MAGAZINE_LIKE_API, 'POST', payload);
};

export const commentMagazineService = (payload: {
  user_id: string;
  magazine_id: string | number;
  content: string;
  parent: null | number;
}): Promise<any> => request(MAGAZINE_COMMENT_API, 'POST', payload);
