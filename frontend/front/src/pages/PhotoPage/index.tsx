/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFeaturePhotoAction } from 'src/features/FeaturePhotos/FeaturePhotoAction';
import Photos from './components/Photos';
import PhotoHeader from './components/PhotoHeader';

function PhotoPage(): JSX.Element {
  const dispatch = useDispatch<any>();
   useEffect(() => {
     dispatch(getFeaturePhotoAction());
   }, [dispatch]);

  return (
    <div style={{ backgroundColor: '#E5E5E5' }}>
      <PhotoHeader />
      <Photos />
    </div>
  );
}

export default PhotoPage;
