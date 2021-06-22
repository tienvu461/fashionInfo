/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { FEARTURE_PHOTO_API, FEARTURE_MAGAZINE_API } from 'src/apis';
import request from 'src/configs';

export const getPhotoFeature = (): any => request(FEARTURE_PHOTO_API, 'GET');
export const getMagazinePhotoFeature = (): any => request(FEARTURE_MAGAZINE_API, 'GET');
