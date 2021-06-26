/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, RootRef, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { RootState } from 'src/store/store';
import { getListSuggestMagazineAction } from 'src/features/Magazine/MagazineAction';
import MagazineCard from 'src/components/MagazineCard';
import BtnViewMore from 'src/components/Buttons/ButtonViewMore';

import useStyles from './useStyles';

interface SuggestionProps {
  paramsId: string;
}

function MagazineSuggestion(props: SuggestionProps): JSX.Element {
  const { paramsId } = props;
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const valueRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);

  const dataMagazineCard = useSelector((state: RootState) => state.magazine.magazineListSuggest);
  const [listCard, setListCard] = useState<Array<any>>([]);

  useEffect(() => {
    setLoading(true);
    setInitialLoading(true);

    // fetch data suggestion magazine card list
    dispatch(getListSuggestMagazineAction(1, +paramsId)).then((data) => {
      const { results = [] } = data;
      setListCard(results);
      setInitialLoading(false);
      setLoading(false);
    });
  }, [dispatch, paramsId]);

  const handleClick = async (key: string) => {
    const { next: nextPage = 0 } = dataMagazineCard;
    const newListCard = [...listCard];
    setLoading(true);

    if (key === 'next') {
      await dispatch(getListSuggestMagazineAction(nextPage, +`${paramsId}`)).then((data) => {
        const { results = [] } = data;
        results.forEach((item) => newListCard.push(item));

        setLoading(false);
      });
    } else {
      // handle previous page
    }
    setListCard(newListCard);
  };

  const loadingCard = () => (
    <>
      {[1, 2, 3].map((id) => (
        <Grid key={id} item lg={4} md={6} sm={6} xl={4} xs={12}>
          <Box marginRight={2} my={5} width='100%'>
            <Skeleton animation='wave' height={250} variant='rect' width='100%' />
            <Box pt={0.5}>
              <Skeleton variant='rect' />
            </Box>
            <Box pt={0.5}>
              <Skeleton variant='rect' width='60%' />
            </Box>
          </Box>
        </Grid>
      ))}
    </>
  );

  const renderCard = () => (
    <>
      {listCard.map((item) => (
        <RootRef rootRef={valueRef} key={`${item.id}`}>
          <div className='gridItem'>
            <MagazineCard cardProps={item} />
          </div>
        </RootRef>
        ))}
    </>
  );

  return (
    <>
      <div className='titleSuggestion'>
        <Typography className={classes.titleSuggestion} component='h4' variant='h4'>
          Đề xuất
        </Typography>
      </div>
      <div className='root'>
        <Grid container className='container'>
          {initialLoading ? (
            <>{loadingCard()}</>
          ) : (
            <>
              {renderCard()}
              <Grid className={classes.btn} item lg={12} md={12} sm={12} xs={12}>
                <>{dataMagazineCard.next ? <BtnViewMore handleClick={handleClick} loading={loading} /> : null}</>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    </>
  );
}

export default MagazineSuggestion;
