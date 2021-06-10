/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getListCategoryAction, getListMagazineAction } from 'src/features/Magazine/MagazineAction';
import MagazineHeader from './MagazineHeader';

function MagazinePage(): JSX.Element {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getListCategoryAction());
      dispatch(getListMagazineAction('Business', 1));
    }, [dispatch]);

    return (
      <div>
        <MagazineHeader />
      </div>
    );
}

export default MagazinePage;
