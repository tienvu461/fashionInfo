/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getListPhoto, getPhotoDetail } from './photoSlice';
import {
  getListPhoto as listPhotoService,
  getPhotoById,
} from '../../services/photo';

export const listPhotoAction = (page: number) => async (dispatch: Dispatch) => {
  try {
    const response = await listPhotoService(page);
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(getListPhoto({ data }));
    }
    return data;
  } catch (error) {
    toast.error(`${error}`);
  }
  return 0;
};

export const getDetailAction = (id: string) => async (dispatch: Dispatch) => {
  try {
    const response = await getPhotoById(id);
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(getPhotoDetail({ data }));
    }
    return data;
  } catch (error) {
    toast.error(`${error}`);
  }
  return 0;
};