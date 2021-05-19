import React from 'react';

interface DetailProps {
  match: {
    params: {
      id: string;
    };
  };
}

function Detail(props: DetailProps): JSX.Element {
  const { match: { params: { id = '' } = {} } = {} } = props;
  console.log(id);
  return <div>abc</div>;
}

export default Detail;
