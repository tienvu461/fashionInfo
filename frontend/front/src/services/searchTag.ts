/* eslint-disable implicit-arrow-linebreak */
import { SEARCH_TAG_API } from '../apis/index';
import request from '../configs/index';

export const searchTagService: any = (number: number| string, textSearch: string) => request(
    `${SEARCH_TAG_API}/search?page=${number}&search_text=${textSearch}`,
    'GET'
    );
