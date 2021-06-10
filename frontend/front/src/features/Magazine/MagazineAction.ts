/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getListCategory, getListMagazine } from 'src/services/magazine';
import { categories, magazineList } from './MagazineSlice';

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

export const getListMagazineAction = () => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await getListMagazine();
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
