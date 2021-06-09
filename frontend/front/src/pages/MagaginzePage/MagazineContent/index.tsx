/* eslint-disable import/no-unresolved */
import React from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import HeaderImg from 'src/assets/images/magazine/entertaimentHeader.png';

import useStyles from './useStyles';
import './_magazine.scss';

interface MangazineContentProps {
  title: string;
}

function MagazineContent(props: MangazineContentProps): JSX.Element {
  const classes = useStyles();
  const { title = '' } = props;

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
      <div className='magazine-list'>
        <Typography className={classes.topic}>
          Chủ đề xu hướng
        </Typography>
      </div>
    </div>
  );
}

export default MagazineContent;
