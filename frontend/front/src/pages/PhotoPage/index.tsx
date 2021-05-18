import React from 'react';
import Photos from './components/Photos';
import PhotoHeader from './components/PhotoHeader';

function PhotoPage(): JSX.Element {
  return (
    <div>
      <PhotoHeader />
      <Photos />
    </div>
  );
}

export default PhotoPage;
