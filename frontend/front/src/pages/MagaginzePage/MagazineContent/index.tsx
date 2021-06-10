/* eslint-disable import/no-unresolved */
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Divider, RootRef, Typography } from '@material-ui/core';
import { isEmpty } from 'lodash';

import HeaderImg from 'src/assets/images/magazine/entertaimentHeader.png';
import MagazineCard from 'src/components/MagazineCard';
import { RootState } from 'src/store/store';

import useStyles from './useStyles';
import './_magazine.scss';

interface MangazineContentProps {
  title: string;
}

function MagazineContent(props: MangazineContentProps): JSX.Element {
  const classes = useStyles();
  const { title = '' } = props;
  const valueRef = useRef<HTMLInputElement>(null);
  const magazineList = useSelector((state: RootState) => state.magazine.magazineList);

  const renderMagazineList = () => (
    <>
      {
        !isEmpty(magazineList?.results) ? magazineList?.results.map((item) => (
          <RootRef rootRef={valueRef} key={`${item}`}>
            <div className='magazine-grid-list'>
              <MagazineCard cardProps={item} />
            </div>
          </RootRef>
        )) : []
      }
    </>
  );

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
      </div>
    </div>
  );
}

export default MagazineContent;
