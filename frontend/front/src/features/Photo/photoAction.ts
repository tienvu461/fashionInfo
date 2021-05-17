/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Dispatch } from '@reduxjs/toolkit';
import { getListPhoto } from './photoSlice';
import { getListPhoto as listPhotoService } from '../../services/photo';

export const listPhotoAction = () => async (dispatch: Dispatch) => {
  try {
    const response = await listPhotoService();
    console.log('SUCCESS', response);
    const { data = {}, status = '' } = response;
    // if (status === 200) {
    //   dispatch(getListPhoto({ data, status }));
    //   console.log('RES', response);
    // }
  } catch (error) {
    const { response = {} } = error;
    console.log('ERROR', error);
  }
};
