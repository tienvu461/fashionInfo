/* eslint-disable implicit-arrow-linebreak */
import { PHOTO_LIST_API } from '../apis';
import request from '../configs/index';

export const getListPhoto = (page) =>
  request(`${PHOTO_LIST_API}/?page=${page}`, 'GET');
