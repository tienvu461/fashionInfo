/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dispatch } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getPhotoFeature, getMagazinePhotoFeature } from 'src/services/featurePhoto';
import { featureListPhoto, featureListMagazine } from './FeaturePhotoSlice';

export const getFeaturePhotoAction = () => async (dispatch: Dispatch): Promise<any> => {
    try {
      const response = await getPhotoFeature();
      const { data = {}, status = '' } = response;
      if (status === 200) {
        dispatch(featureListPhoto(data));
        return data;
      }
    } catch (error) {
      toast.error(`${error}`);
    }
    return 0;
  };

export const getFeatureMagazineAction = (category: string) => async (dispatch: Dispatch): Promise<any> => {
    try {
      const response = await getMagazinePhotoFeature(category);
      const { data = {}, status = '' } = response;
      if (status === 200) {
        dispatch(featureListMagazine(data));
        return data;
      }
    } catch (error) {
      // toast.error(`${error}`);
    }
    return 0;
  };
