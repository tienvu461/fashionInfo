/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Grid, Typography, Tabs, Tab } from '@material-ui/core';
import banner from 'src/assets/images/magazine/banner.png';
import TabPanel from './component/TabPanel';
import useStyles from './useStyles';
import Entertainment from '../Entertainment';

import './_magazineHeader.scss';

const a11yProps = (index: any) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const arrMenu = [
  {
    label: 'Thời trang',
    content: 'Item One',
  },
  {
    label: 'Giải trí',
    content: <Entertainment />,
  },
  {
    label: 'Nghệ thuật',
    content: 'Item Three',
  },
  {
    label: 'Phong cách sống',
    content: 'Item Four',
  },
];

function MagazineHeader(): JSX.Element {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChangeTab = (event: React.ChangeEvent<any>, newValue: number) => {
      setValue(newValue);
    };

    return (
      <div className='magazineHeader'>
        <Grid container>
          <Grid className='banner' item xs={12} sm={12} md={12} lg={12} xl={12}>
            <img className='banner-img' src={banner} alt='banner' />
          </Grid>
        </Grid>
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
            className={classes.tab}
          >
            {arrMenu.map((menu, index) => (
              <Tab key={`${index + 1}`} label={menu.label} {...a11yProps(1)} className={classes.menuTab} />
              ))}
          </Tabs>
        </div>
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
