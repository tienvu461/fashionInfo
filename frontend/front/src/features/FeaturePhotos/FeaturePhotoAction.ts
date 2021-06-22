/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getPhotoFeature } from "src/services/featurePhoto";
import { featureList } from './FeaturePhotoSlice';

export const getFeaturePhotoAction = () => async (dispatch: Dispatch): Promise<any> => {
    try {
      const response = await getPhotoFeature();
      const { data = {}, status = '' } = response;
      if (status === 200) {
        dispatch(featureList(data));
        return data;
      }
    } catch (error) {
      toast.error(`${error}`);
    }
    return 0;
  };
