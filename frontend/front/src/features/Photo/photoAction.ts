/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from '@reduxjs/toolkit';
import { getListPhoto } from './photoSlice';
import { getListPhoto as listPhotoService } from '../../services/photo';

export const listPhotoAction = (page: number) => async (dispatch: Dispatch) => {
  try {
    const response = await listPhotoService(page);
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(getListPhoto({ data, status }));
    }
    return data;
  } catch (error) {
    console.log('ERROR', error);
  }
  return 0;
};
