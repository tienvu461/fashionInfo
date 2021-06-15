import React from 'react';

interface DetailProps {
  match: {
    params: {
      id: string;
    };
  };
}

function DetailMagazine(props: DetailProps): JSX.Element {
    const { match: { params: { id = '' } = {} } = {} } = props;
    return (
      <div>
        Hola {id}
      </div>
    );
}

export default DetailMagazine;
