/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { MAGAZINE_LIST_CATEGORY_API } from 'src/apis';
import request from 'src/configs';

export const getListCategory = (): any => request(MAGAZINE_LIST_CATEGORY_API, 'GET');
