import React from 'react';
import Photo from './components/Photo';
import PhotoHeader from './components/PhotoHeader';

function PhotoPage(): JSX.Element {
  return (
    <div>
      <PhotoHeader />
      <Photo />
    </div>
  );
}

export default PhotoPage;
