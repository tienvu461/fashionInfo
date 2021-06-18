/* eslint-disable import/no-unresolved */
import React, { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategoryAction, getListMagazineAction } from 'src/features/Magazine/MagazineAction';
import { RootState } from 'src/store/store';

const MagazineHeader = lazy(() => import('./components/MagazineHeader'));

function MagazinePage(): JSX.Element {
    const dispatch = useDispatch();
    const magazineMenu = useSelector((state: RootState) => state.magazine.magazineMenu);

    useEffect(() => {
      dispatch(getListCategoryAction());
      if (!magazineMenu.menu) {
        dispatch(getListMagazineAction('Business', 1));
      }
    }, [dispatch, magazineMenu.menu]);

    return (
      <div>
        <MagazineHeader />
      </div>
    );
}

export default MagazinePage;
