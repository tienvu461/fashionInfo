/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, CircularProgress, Divider, Grid, RootRef, Typography, useMediaQuery } from '@material-ui/core';
import { isEmpty } from 'lodash';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import HeaderImg from 'src/assets/images/magazine/bannerTab.png';
import HeaderImg1 from 'src/assets/images/magazine/styleTab.jpg';
import HeaderImg2 from 'src/assets/images/magazine/entertaimentTab.jpg';
import HeaderImg3 from 'src/assets/images/magazine/fashionTab.jpg';
import MagazineCard from 'src/components/MagazineCard';
import { getListMagazineAction } from 'src/features/Magazine/MagazineAction';
import { RootState } from 'src/store/store';

import useStyles from './useStyles';
import './_magazine.scss';

interface MangazineContentProps {
  title: string;
  category: string;
}

const MagazineContent: React.FunctionComponent<MangazineContentProps> = (props) => {
  const classes = useStyles();
  const { title = '', category = '' } = props;
  const dispatch = useDispatch<any>();

  const [loading, setLoading] = useState<boolean>(false);
  const [listCard, setListCard] = useState<Array<any>>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);

  const valueRef = useRef<HTMLInputElement>(null);
  const magazineList = useSelector((state: RootState) => state.magazine.magazineList);

  const matches = useMediaQuery('(min-width:1600px)');
  const matches1 = useMediaQuery('(min-width:1280px)');
  const matches2 = useMediaQuery('(min-width:960px)');

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
      {listCard.map((item) => (
        <RootRef rootRef={valueRef} key={`${item}`}>
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

  if (initialLoading) return <CircularProgress />;

  const getBanner = () => {
    switch (category) {
      case 'Thời trang':
      return HeaderImg3;
      break;
      case 'Giải trí':
      return HeaderImg2;
      break;
      case 'Nghệ thuật':
      return HeaderImg;
      break;
      default:
      return HeaderImg1;
    }
  };

   const controlWidthImg = () => {
     if (matches) {
       return 740;
     }
     if (matches1) {
       return 1160 * (37 / 76);
     }
     if (matches2) return '100%';

     return '100%';
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

  return (
    <div className='magazine'>
      <div className={`magazine-container ${classes.container}`}>
        <div className='magazine-img'>
          <LazyLoadImage
            alt='magazine-header-img'
            src={getBanner()}
            effect='blur'
            height={controlHeithImg()}
            width={controlWidthImg()}
            delayMethod
          />
        </div>
        <div className={classes.magazineHeader}>
          <div className='magazine-title '>
            <Typography variant='h3' component='h3' className={`${classes.magazineTitle} ${classes.headerTitle}`}>
              {title}
            </Typography>
            <Typography className={`${classes.magazineTitle} ${classes.headerSubTitle}`}>
              Dép xỏ ngón là món đồ rất thông dụng. Nhưng nó hoàn toàn có thể trở thành một phụ kiện thời trang
              &quot;hợp mốt&quot; nếu bạn biết cách lựa chọn trang phục. Bạn có biết, gia tăng năng lượng tích cực và
              thu hút những điều tốt đẹp trong cuộc sống?
            </Typography>
            <div className={classes.author}>
              <Typography variant='h6' component='h6' className={classes.authorName}>
                Lucete
              </Typography>
              <Divider className={classes.divide} />
              <Typography className={classes.authorTime}>2 giờ trước</Typography>
            </div>
          </div>
        </div>
      </div>
      <div className='magazine-topic'>
        <Typography className={classes.topic}>Chủ đề xu hướng</Typography>

        <div className='magazine-list'>{renderMagazineList()}</div>
        <Grid className={classes.btn} item lg={12} md={12} sm={12} xs={12}>
          <Grid>
            {magazineList?.next === null ? null : (
              <Button
                className={classes.nextBtn}
                endIcon={loading ? <CircularProgress className={classes.loading} /> : null}
                onClick={() => handleClick('next')}
                variant='contained'
              >
                <Typography className={classes.textBtn} component='h4' variant='h4'>
                  Xem thêm
                </Typography>
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MagazineContent;
