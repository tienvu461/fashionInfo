/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { CircularProgress, Divider, Grid, RootRef, Typography, useMediaQuery } from '@material-ui/core';
import { isEmpty } from 'lodash';
import moment from 'moment';

import MagazineCard from 'src/components/MagazineCard';
import { getListMagazineAction } from 'src/features/Magazine/MagazineAction';
import BtnViewMore from 'src/components/Buttons/ButtonViewMore';
import { RootState } from 'src/store/store';
import { HOST } from 'src/apis';
import { ROUTE_MAGAZINE_DETAIL } from 'src/constants';

import useStyles from './useStyles';
import './_magazine.scss';

interface MangazineContentProps {
  category: string;
  loading: boolean;
}

const MagazineContent: React.FunctionComponent<MangazineContentProps> = (props) => {
  const classes = useStyles();
  const { category = '', loading: loadingTab } = props;
  const dispatch = useDispatch<any>();
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [listCard, setListCard] = useState<Array<any>>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);

  const matches = useMediaQuery('(min-width:1600px)');
  const matches1 = useMediaQuery('(min-width:1280px)');
  const matches2 = useMediaQuery('(min-width:960px)');

  const valueRef = useRef<HTMLInputElement>(null);
  const magazineList = useSelector((state: RootState) => state.magazine.magazineList);
  const featureListMagazine = useSelector((state: RootState) => state.featurePhoto.featureListMagazine);

  const formatDate = (time: number) => moment(time * 1000).fromNow();

  const checkPathImg = (path) => {
    if (path.includes(HOST)) {
      return path;
    }

    return `${HOST}${path}`;
  };

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
      const nextNum = nextPage.split('&page=').pop();
      await dispatch(getListMagazineAction(category, +`${nextNum}`)).then((data) => {
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

  const controlHeithImg = () => {
    if (matches) {
      return 600;
    }
    if (matches1) {
      return 1160 * (15 / 38);
    }
    if (matches2) return 'auto';

    return '100%';
  };

   const renderMagazineTrending = (data) => {
     const {
       thumbnail = '',
       title: titleMagazine = '',
       summary = '',
       sub_category = '',
       created_at = 0,
       id = 0
     } = data[0].feature_magazine;

       return (
         <div
           onClick={() => history.push(`${ROUTE_MAGAZINE_DETAIL}/${id}`)}
           className={`magazine-container ${classes.container}`}
         >
           <div className='magazine-img'>
             {loadingTab ? (
               <CircularProgress />
             ) : (
               <LazyLoad style={{ height: `${controlHeithImg()}px`, width: '100%' }}>
                 <img alt='ok' src={checkPathImg(thumbnail)} />
               </LazyLoad>
             )}
           </div>
           <div className={classes.magazineHeader}>
             <div className='magazine-title '>
               <Typography variant='h3' component='h3' className={`${classes.magazineTitle} ${classes.headerTitle}`}>
                 {titleMagazine}
               </Typography>
               <Typography className={`${classes.magazineTitle} ${classes.headerSubTitle}`}>{summary}</Typography>
               <div className={classes.author}>
                 <Typography variant='h6' component='h6' className={classes.authorName}>
                   {sub_category}
                 </Typography>
                 <Divider className={classes.divide} />
                 <Typography className={classes.authorTime}>{formatDate(created_at)}</Typography>
               </div>
             </div>
           </div>
         </div>
       );
   };

  if (initialLoading) return <CircularProgress />;
  if (isEmpty(listCard)) return null;
  return (
    <div className='magazine'>
      {isEmpty(featureListMagazine) ? null : renderMagazineTrending(featureListMagazine)}
      <div className='magazine-topic'>
        <Typography className={classes.topic}>Chủ đề xu hướng</Typography>

        <div className='magazine-list'>{renderMagazineList()}</div>
        <Grid className={classes.btn} item lg={12} md={12} sm={12} xs={12}>
          <Grid>
            {magazineList?.next === null ? null : <BtnViewMore handleClick={handleClick} loading={loading} />}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MagazineContent;
