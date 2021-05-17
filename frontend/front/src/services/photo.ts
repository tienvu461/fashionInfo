import { PHOTO_LIST_API } from '../apis';
import request from '../configs/index';

export const getListPhoto = () => request(PHOTO_LIST_API, 'GET');
