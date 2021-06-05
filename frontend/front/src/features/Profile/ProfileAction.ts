/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from '@reduxjs/toolkit';

import { profileService } from 'src/services/auth';
import { storeProfile } from './ProfileSlice';

export const getUserProfile = () => async (dispatch: Dispatch): Promise<any> => {
  try {
    const response = await profileService();
    const { data = {}, status = '' } = response;
    if (status === 200) {
      dispatch(storeProfile(data));
    }
  } catch (error) {
    // console.log(error);
  }
};
