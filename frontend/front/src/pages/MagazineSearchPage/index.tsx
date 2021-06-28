/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CircularProgress, Grid, RootRef, Typography } from '@material-ui/core';
import { isEmpty } from 'lodash';

import MagazineCard from 'src/components/MagazineCard';
import BtnViewMore from 'src/components/Buttons/ButtonViewMore';
import { RootState } from 'src/store/store';
import { searchMagazineAction } from 'src/features/Search/searchAction';

import useStyles from '../MagaginzePage/components/MagazineContent/useStyles';
import '../MagaginzePage/components/MagazineContent/_magazine.scss';
import '../PhotoPage/components/Photos/_photos.scss';

function MagazineSearchPage(): JSX.Element {
  const classes = useStyles();
  const dispatch = useDispatch<any>();

  const [loading, setLoading] = useState<boolean>(false);
  const [listCard, setListCard] = useState<Array<any>>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const valueRef = useRef<HTMLInputElement>(null);
  const magazineList = useSelector((state: RootState) => state.searchTag.dataSearch.dataOrigin);
  const textSearch = useSelector((state: RootState) => state.searchTag.textSearch);
  const location = useLocation();

  const getUrlCurrent = location.pathname;

  const splitText = getUrlCurrent.split('/');
  const valueSearch = splitText[splitText.length - 1];

  const listMagazineByCategory = useMemo(() => {
    if (!isEmpty(magazineList?.results)) {
      return magazineList?.results;
    }
    return [];
  }, [magazineList?.results]);

  useEffect(() => {
    setInitialLoading(true);
    if (listMagazineByCategory) {
      setListCard(listMagazineByCategory);
      setInitialLoading(false);
    }
  }, [listMagazineByCategory]);

  useEffect(() => {
    setInitialLoading(true);
    dispatch(searchMagazineAction(1, valueSearch)).then((data) => {
      const { results = [] } = data;
      setListCard(results);
      setInitialLoading(false);
    });
  }, [dispatch, valueSearch]);

  const renderMagazineList = () => (
    <>
      {listCard.map((item, index) => (
        <RootRef rootRef={valueRef} key={`${index + 0}`}>
          <div className='magazine-grid-list'>
            <MagazineCard cardProps={item} />
          </div>
        </RootRef>
      ))}
    </>
  );

  const handleClick = async (key: string) => {
    const { next: nextPage = '' } = magazineList;
    const newListCard = [...listCard];
    setLoading(true);
    if (key === 'next') {
      const splitString = nextPage.split('?page=').pop();
      const nextNum = splitString.split('&search_text=').shift();

      await dispatch(searchMagazineAction(+`${nextNum}`, textSearch)).then((data) => {
        const { results = [] } = data;
        results.forEach((item) => newListCard.push(item));

        setLoading(false);
      });
    } else {
      // handle previous page
    }

    setListCard(newListCard);
    valueRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  };

  const handleSearchTagNotFound = () => {
    if (magazineList.count === 0) {
      return <Typography className={`${classes.textSearch} textSearch`}>Tag is not found</Typography>;
    }
    return null;
  };

  if (initialLoading) return <CircularProgress />;

  return (
    <div className='magazine'>
      <div className='magazine-topic'>
        <Grid className='container' container>
          <Typography className={`${classes.textSearch} textSearch`}>{`#${textSearch}`}</Typography>
          {handleSearchTagNotFound()}
        </Grid>

        <div className='magazine-list'>{renderMagazineList()}</div>
        <Grid className={classes.btn} item lg={12} md={12} sm={12} xs={12}>
          <Grid>
            {magazineList?.next === null ? null : <BtnViewMore handleClick={handleClick} loading={loading} />}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default MagazineSearchPage;
