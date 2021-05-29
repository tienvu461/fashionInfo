/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */

import { Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getListPhoto as listPhotoService,
  getPhotoById,
  getListSuggestionPhoto,
  likePhotoService,
} from 'src/services/photo';
import { getListPhoto, getPhotoDetail, getListPhotoSuggestion } from './photoSlice';

export const listPhotoAction = (page: number) => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await listPhotoService(page);
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(getListPhoto({ data }));
      return data;
    }
  } catch (error) {
    toast.error(`${error}`);
  }
  return 0;
};

export const getDetailAction = (id: string) => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await getPhotoById(id);
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(getPhotoDetail({ data }));
    }
    return response;
  } catch (error) {
    toast.error(`${error}`);
  }
  return 0;
};

export const getPhotoSuggestAction = (num: number, id: string) => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await getListSuggestionPhoto(num, id);
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(getListPhotoSuggestion({ data }));
      return data;
    }
  } catch (error) {
    toast.error(`${error}`);
  }
  return 0;
};

export const likePhotoAction = (payload: { user_id: string; photo_id: string }) => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await likePhotoService(payload);
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(getListPhotoSuggestion({ data }));
      return data;
    }
  } catch (error) {
    toast.error(`${error}`);
  }
  return 0;
};
