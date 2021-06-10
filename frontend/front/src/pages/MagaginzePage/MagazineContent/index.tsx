/* eslint-disable import/no-unresolved */
import React from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import HeaderImg from 'src/assets/images/magazine/entertaimentHeader.png';

import useStyles from './useStyles';
import './_entertaiment.scss';

interface MangazineContentProps {
  title: string;
}

function MagazineContent(props: MangazineContentProps): JSX.Element {
  const classes = useStyles();
  const { title = '' } = props;

  return (
    <div className='entertaiment'>
      <div className={`container ${classes.container}`}>
        <div className='entertaiment-img'>
          <img alt='entertaiment-header' src={HeaderImg} />
        </div>
        <div className={classes.entertaimentHeader}>
          <div className='entertaiment-title '>
            <Typography variant='h3' component='h3' className={`${classes.entertaimentTitle} ${classes.headerTitle}`}>
              {`Tiêu đề bài nổi bật: ${title}`}
            </Typography>
            <Typography className={`${classes.entertaimentTitle} ${classes.headerSubTitle}`}>
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
    </div>
  );
}

export default MagazineContent;
