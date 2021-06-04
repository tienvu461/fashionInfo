/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from '@reduxjs/toolkit';
import { searchTagService } from '../../services/searchTag';
import { getDataSearch } from './searchSlide';

export const searchAction = (number: number| string, textSearch: string): any => async (dispatch: Dispatch) => {
    try {
        const response = await searchTagService(number, textSearch);
        // console.log('RESPONSE', response);
        const { data = {}, status = '' } = response;
        if (status === 200) {
            dispatch(getDataSearch({ data }));
            return data;
        }
    } catch (error) {
        // console.error(error);
    }
    return 1;
};
