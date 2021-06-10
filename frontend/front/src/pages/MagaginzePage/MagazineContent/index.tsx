/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, CircularProgress, Divider, Grid, RootRef, Typography } from '@material-ui/core';
import { isEmpty } from 'lodash';

import HeaderImg from 'src/assets/images/magazine/entertaimentHeader.png';
import MagazineCard from 'src/components/MagazineCard';
import { getListMagazineAction } from 'src/features/Magazine/MagazineAction';
import { RootState } from 'src/store/store';

import useStyles from './useStyles';
import './_magazine.scss';

interface MangazineContentProps {
  title: string;
  category: string;
}

function MagazineContent(props: MangazineContentProps): JSX.Element {
  const classes = useStyles();
  const { title = '', category = '' } = props;
  const dispatch = useDispatch<any>();
  const [listCard, setListCard] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const valueRef = useRef<HTMLInputElement>(null);
  const magazineList = useSelector((state: RootState) => state.magazine.magazineList);

  const filterListMagazine = (arr: Array<any>) => {
    let filterArr = arr.map((item) => (item.category === category ? item : null));
    filterArr = filterArr.filter((item) => item !== null);
    return filterArr;
  };

  const listMagazineByCategory = useMemo(() => {
    if (!isEmpty(magazineList?.results)) {
      return filterListMagazine(magazineList?.results);
    }
    return [];
  }, [magazineList?.results]);

  useEffect(() => {
    setListCard(listMagazineByCategory);
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

  return (
    <div className='magazine'>
      <div className={`magazine-container ${classes.container}`}>
        <div className='magazine-img'>
          <img alt='magazine-header' src={HeaderImg} />
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
          <>
            {
             listMagazineByCategory.length < 6 ? null
              : (
                <Button
                  className={classes.nextBtn}
                  endIcon={loading ? <CircularProgress /> : null}
                  onClick={() => handleClick('next')}
                  variant='contained'
                >
                  <Typography className={classes.textBtn} component='h4' variant='h4'>
                    Xem thêm
                  </Typography>
                </Button>)
            }
          </>
        </Grid>
      </div>
    </div>
  );
}

export default MagazineContent;
