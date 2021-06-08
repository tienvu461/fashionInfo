/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, Typography, Tabs, Tab, useMediaQuery } from '@material-ui/core';
import { RootState } from 'src/store/store';
import banner from 'src/assets/images/magazine/banner.png';
import TabPanel from './component/TabPanel';
import useStyles from './useStyles';
import MagazineContent from '../MagazineContent';

import './_magazineHeader.scss';

const a11yProps = (index: any) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const arrMenu = [
  {
    label: 'Thời trang',
    content: <MagazineContent title='Thời trang' />,
  },
  {
    label: 'Giải trí',
    content: <MagazineContent title='Giải trí' />,
  },
  {
    label: 'Nghệ thuật',
    content: <MagazineContent title='Nghệ thuật' />,
  },
  {
    label: 'Phong cách sống',
    content: <MagazineContent title='Phong cách sống' />,
  },
];

function MagazineHeader(): JSX.Element {
    const classes = useStyles();
    const [value, setValue] = useState<number>(0);
    const matches = useMediaQuery('(max-width:1080px)');

    const magazineMenu = useSelector((state: RootState) => state.magazine.magazineMenu);

    const handleChangeTab = (event: React.ChangeEvent<any>, newValue: number) => {
      setValue(newValue);
    };

    useEffect(() => {
      if (magazineMenu) {
        setValue(magazineMenu.id);
      }
    }, [magazineMenu]);

    return (
      <div className='magazineHeader'>
        <Grid container>
          <Grid className='banner' item xs={12} sm={12} md={12} lg={12} xl={12}>
            <img className='banner-img' src={banner} alt='banner' />
          </Grid>
        </Grid>
        {
          matches ? null : (
            <div className='magazineContent'>
              <Typography className={classes.titleHeadLine} variant='h2' component='h2'>
                Khu vực Headline
              </Typography>
              <Tabs
                TabIndicatorProps={{
                    style: {
                      display: 'none',
                    },
                  }}
                value={value}
                onChange={handleChangeTab}
                aria-label='simple tabs menu'
              >
                {arrMenu.map((menu, index) => (
                  <Tab key={`${index + 1}`} label={menu.label} {...a11yProps(1)} className={classes.menuTab} />
                  ))}
              </Tabs>
            </div>
          )
        }
        {arrMenu.map((menu, index) => (
          <div className={classes.content} key={`${index + 1}`}>
            <TabPanel value={value} index={index}>
              {menu.content}
            </TabPanel>
          </div>
        ))}
      </div>
    );
}

export default MagazineHeader;
