import React from 'react';
import Photos from './components/Photos';
import PhotoHeader from './components/PhotoHeader';

function PhotoPage(): JSX.Element {
  return (
    <div style={{ backgroundColor: '#E5E5E5' }}>
      <PhotoHeader />
      <Photos />
    </div>
  );
}

export default PhotoPage;
