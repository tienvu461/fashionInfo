/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Grid, Typography, Tabs, Tab } from '@material-ui/core';
import banner from 'src/assets/images/magazine/banner.png';
import TabPanel from './component/TabPanel';
import useStyles from './useStyles';

import './_magazineHeader.scss';

const a11yProps = (index: any) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

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
          <div>
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
              <Tab label='Thời trang' {...a11yProps(0)} className={classes.menuTab} />
              <Tab label='Giải trí' {...a11yProps(1)} className={classes.menuTab} />
              <Tab label='Nghệ thuật' {...a11yProps(2)} className={classes.menuTab} />
              <Tab label='Phong cách sống' {...a11yProps(3)} className={classes.menuTab} />
            </Tabs>
            <TabPanel value={value} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Four
            </TabPanel>
          </div>
        </div>
      </div>
    );
}

export default MagazineHeader;
