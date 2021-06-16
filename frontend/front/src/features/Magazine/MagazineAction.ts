/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getListCategory, getListMagazine, getListSuggestMagazine, getDetailMagazineCard, likeMagazineService } from 'src/services/magazine';
import { categories, magazineDetail, magazineLikes, magazineList, magazineListSuggest } from './MagazineSlice';

export const getListCategoryAction = () => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await getListCategory();
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(categories(data));
      return data;
    }
  } catch (error) {
    toast.error(`${error}`);
  }
  return 0;
};

export const getListMagazineAction = (cat: string, num: number) => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await getListMagazine(cat, num);
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(magazineList(data));
      return data;
    }
  } catch (error) {
    toast.error(`${error}`);
  }
  return 0;
};

export const fetchDetailMagazineAction = (id: number) => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await getDetailMagazineCard(id);
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(magazineDetail(data));
      return response;
    }
  } catch (error) {
    toast.error(`${error}`);
  }
  return 0;
};

export const getListSuggestMagazineAction = (id: number) => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await getListSuggestMagazine(id);
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(magazineListSuggest(data));
      return data;
    }
  } catch (error) {
    toast.error(`${error}`);
  }
  return 0;
};

export const likeMagazineAction = (payload: { user_id: string; news_id: string | number }) => async (dispatch: Dispatch): Promise<any> => {
    try {
      const response = await likeMagazineService(payload);
      const { data = {}, status = '' } = response;
      if (status === 200) {
        dispatch(magazineLikes({ data }));
        return data;
      }
    } catch (error) {
      toast.error(`${error}`);
    }
    return 0;
  };
