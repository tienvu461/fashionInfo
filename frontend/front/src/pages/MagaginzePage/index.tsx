/* eslint-disable import/no-unresolved */
import React, { useEffect, lazy } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { getListCategoryAction, getListMagazineAction } from 'src/features/Magazine/MagazineAction';
import { RootState } from 'src/store/store';
import { getFeaturePhotoAction } from 'src/features/FeaturePhotos/FeaturePhotoAction';

const MagazineHeader = lazy(() => import('./components/MagazineHeader'));

function MagazinePage(): JSX.Element {
    const dispatch = useDispatch();
    const magazineMenu = useSelector((state: RootState) => state.magazine.magazineMenu);
    const categories = useSelector((state: RootState) => state.magazine.categories);
    const getCategory = () => {
      let catName = '';
      if (!isEmpty(categories.results)) {
        catName = categories.results[0].cat_name;
      }
      return catName;
    };
    const catName = getCategory();

    useEffect(() => {
      dispatch(getListCategoryAction());
      if (!magazineMenu.menu && catName) {
        dispatch(getListMagazineAction(catName, 1));
      }
    }, [dispatch, magazineMenu.menu, catName]);

    useEffect(() => {
      dispatch(getFeaturePhotoAction());
    }, [dispatch]);

    if (!catName) return <CircularProgress />;

    return (
      <div>
        <MagazineHeader categoryName={catName} />
      </div>
    );
}

export default MagazinePage;
