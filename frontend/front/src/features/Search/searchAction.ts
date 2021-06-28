/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from '@reduxjs/toolkit';
import { searchTagMagazineService, searchTagPhotoService } from '../../services/searchTag';
import { getDataSearch, textSearch } from './searchSlide';

export const searchPhotoAction = (number: number| string, valueSearch: string): any => async (dispatch: Dispatch) => {
    try {
        const response = await searchTagPhotoService(number, valueSearch);
        const { data = {}, status = '' } = response;
        if (status === 200) {
            dispatch(getDataSearch({ data }));
            dispatch(textSearch(valueSearch));
            return data;
        }
    } catch (error) {
        // console.error(error);
    }
    return 1;
};

export const searchMagazineAction = (number: number| string, valueSearch: string): any => async (dispatch: Dispatch) => {
    try {
        const response = await searchTagMagazineService(number, valueSearch);
        const { data = {}, status = '' } = response;
        if (status === 200) {
            dispatch(getDataSearch({ data }));
            dispatch(textSearch(valueSearch));
            return data;
        }
    } catch (error) {
        // console.error(error);
    }
    return 1;
};
