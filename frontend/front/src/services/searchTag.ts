/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SEARCH_TAG_API } from '../apis/index';
import request from '../configs/index';

export const searchTagService = (number: number| string, textSearch: string): any =>
request(
    `${SEARCH_TAG_API}/search?page=${number}&search_text=${textSearch}`,
    'GET'
    );
