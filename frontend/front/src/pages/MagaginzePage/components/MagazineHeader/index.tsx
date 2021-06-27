/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, Tabs, Tab, useMediaQuery } from '@material-ui/core';
import { isEmpty } from 'lodash';
import { RootState } from 'src/store/store';
import banner from 'src/assets/images/magazine/banner.png';
import { getListMagazineAction } from 'src/features/Magazine/MagazineAction';
import { getFeatureMagazineAction } from 'src/features/FeaturePhotos/FeaturePhotoAction';
import TabPanel from './component/TabPanel';
import useStyles from './useStyles';
import MagazineContent from '../MagazineContent';

import './_magazineHeader.scss';

const a11yProps = (index: any) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

interface IProps {
  categoryName: string;
}

const MagazineHeader: React.FunctionComponent<IProps> = ({ categoryName }) => {
  const classes = useStyles();
  const [value, setValue] = useState<number>(0);
  const [caterogyName, setCategoryName] = useState<string>(categoryName);
  const dispatch = useDispatch();
  const matches = useMediaQuery('(max-width:1080px)');
  const matchToRenderTab = useMediaQuery('(max-width:1280px)');

  const magazineMenu = useSelector((state: RootState) => state.magazine.magazineMenu);
  const categories = useSelector((state: RootState) => state.magazine.categories);

  const arrMenu = useMemo(() => {
    if (!isEmpty(categories.results)) {
      return categories.results.map((cat) => ({
        label: cat.cat_name,
        description: cat.description,
      }));
    }
    return [];
  }, [categories.results]);

  const getMagazineList = (getCategoryName) => {
    setCategoryName(getCategoryName);
    dispatch(getFeatureMagazineAction(getCategoryName));
    dispatch(getListMagazineAction(getCategoryName, 1));
  };

  // fetch menu tab when click item menu in Drawer sidebar at mobile screen mode
  useEffect(() => {
    if (magazineMenu.id || magazineMenu.menu) {
      window.scrollTo({
        top: 100,
        left: 0,
        behavior: 'smooth',
      });
      setValue(magazineMenu.id);
      getMagazineList(magazineMenu.menu);
    }
  }, [magazineMenu, dispatch]);

  const handleChangeTab = (event: React.ChangeEvent<any>, newValue: number) => {
    let getCategoryName = arrMenu.map((item, index) => (index === newValue ? item.label : null));
    getCategoryName = getCategoryName.filter((item) => item !== null);

    setValue(newValue);
    setCategoryName(getCategoryName[0]);
    dispatch(getFeatureMagazineAction(getCategoryName[0]));
    dispatch(getListMagazineAction(getCategoryName[0], 1));
  };

  return (
    <div className='magazineHeader'>
      <Grid container>
        <Grid className='banner' item xs={12} sm={12} md={12} lg={12} xl={12}>
          <img className='banner-img' src={banner} alt='banner' />
        </Grid>
      </Grid>
      {matches ? null : (
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
            variant='scrollable'
            scrollButtons={matchToRenderTab ? 'on' : 'off'}
            value={value}
            onChange={handleChangeTab}
            aria-label='simple tabs menu'
          >
            {arrMenu.map((menu, index) => (
              <Tab key={`${index + 1}`} label={menu.label} {...a11yProps(1)} className={classes.menuTab} />
            ))}
          </Tabs>
        </div>
      )}
      {arrMenu.map((menu, index) => (
        <div className={classes.content} key={`${index + 1}`}>
          <TabPanel value={value} index={index}>
            <MagazineContent category={caterogyName} />
          </TabPanel>
        </div>
      ))}
    </div>
  );
};

export default MagazineHeader;
