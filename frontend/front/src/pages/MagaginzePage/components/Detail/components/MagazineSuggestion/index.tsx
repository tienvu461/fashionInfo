/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Button, Typography, RootRef, Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RootState } from 'src/store/store';
import { getListSuggestMagazineAction } from 'src/features/Magazine/MagazineAction';
import MagazineCard from 'src/components/MagazineCard';

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

  const dataMagazineCard = useSelector((state: RootState) => state.magazine.magazineListSuggest.dataOrigin);
  const listMagazineCard = useSelector((state: RootState) => state.magazine.magazineListSuggest.listCard);
  const [listCard, setListCard] = useState<Array<any>>([]);

  // useEffect(() => {
  //   setLoading(true);
  //   setInitialLoading(true);

  //   // fetch data suggestion magazine card list
  //   dispatch(getListSuggestMagazineAction(+paramsId)).then((data) => {
  //     const { results = [] } = data;
  //     setListCard(results);
  //     setInitialLoading(false);
  //     setLoading(false);
  //   });
  // }, [dispatch, paramsId]);

  // const loadingCard = () => (
  //   <>
  //     {[1, 2, 3].map((id) => (
  //       <Grid key={id} item lg={4} md={6} sm={6} xl={4} xs={12}>
  //         <Box marginRight={2} my={5} width='100%'>
  //           <Skeleton animation='wave' height={250} variant='rect' width='100%' />
  //           <Box pt={0.5}>
  //             <Skeleton variant='rect' />
  //           </Box>
  //           <Box pt={0.5}>
  //             <Skeleton variant='rect' width='60%' />
  //           </Box>
  //         </Box>
  //       </Grid>
  //     ))}
  //   </>
  // );

  // const renderCard = () => (
  //   <>
  //     {listCard.map((item, index: number) => {
  //       const { id = 0, image_path: pathImgs = '', activities, user_likes: userLikes = [] } = item;

  //       return (
  //         <RootRef rootRef={valueRef} key={`${id}`}>
  //           <div className='gridItem'>
  //             <MagazineCard activities={activities} id={id} pathImg={pathImgs} userLikes={userLikes} />
  //           </div>
  //         </RootRef>
  //       );
  //     })}
  //   </>
  // );

  return (
    <>
      <div className='titleSuggestion'>
        <Typography className={classes.titleSuggestion} component='h4' variant='h4'>
          Đề xuất
        </Typography>
      </div>
      {/* <div className='root'>
          <Grid container className='container'>
            {initialLoading ? (
              <>{loadingCard()}</>
            ) : (
              <>
                {renderCard()}
                <Grid className={classes.btn} item lg={12} md={12} sm={12} xs={12}>
                  <>
                    {dataPhoto.next ? (
                      <Button
                        className={classes.nextBtn}
                        endIcon={loading ? <CircularProgress /> : null}
                        onClick={() => handleClick('next')}
                        variant='contained'
                      >
                        <Typography className={classes.textBtn} component='h4' variant='h4'>
                          Xem thêm
                        </Typography>
                      </Button>
                    ) : null}
                  </>
                </Grid>
              </>
            )}
          </Grid>
        </div> */}
    </>
  );
}

export default MagazineSuggestion;
