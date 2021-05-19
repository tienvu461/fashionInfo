import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDetailAction } from '../../../../../features/Photo/photoAction';

interface DetailProps {
  match: {
    params: {
      id: string;
    };
  };
}

function Detail(props: DetailProps): JSX.Element {
  const { match: { params: { id = '' } = {} } = {} } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetailAction(id));
  }, [dispatch, id]);

  return <div>abc</div>;
}

export default Detail;
