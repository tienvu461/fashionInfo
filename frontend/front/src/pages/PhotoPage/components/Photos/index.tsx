import React from 'react';
import { Grid } from '@material-ui/core';

import useStyles from './useStyles';
import Photo from './Photo';

function Photos(): JSX.Element {
  const classes = useStyles();

  const renderPhoto = () => {
    interface GalleryType {
      title: string;
      id: number;
    }
    const gallery: Array<GalleryType> = [
      {
        title: 'pic1',
        id: 1,
      },
      {
        title: 'pic2',
        id: 2,
      },
      {
        title: 'pic3',
        id: 3,
      },
      {
        title: 'pic4',
        id: 4,
      },
      {
        title: 'pic5',
        id: 5,
      },
      {
        title: 'pic6',
        id: 6,
      },
      {
        title: 'pic7',
        id: 7,
      },
      {
        title: 'pic8',
        id: 8,
      },
      {
        title: 'pic9',
        id: 9,
      },
    ];

    return (
      <>
        {gallery.map(({ id = 0 }, index) => (
          <Grid
            key={id}
            className={classes.gridItem}
            item
            lg={4}
            md={6}
            sm={6}
            spacing={2}
            style={
              index >= 0 && index <= 2 ? { paddingTop: '0 !important' } : {}
            }
            wrap='wrap'
            xl={4}
            xs={12}
          >
            <Photo />
          </Grid>
        ))}
      </>
    );
  };

  return (
    <div className={`${classes.root} root`}>
      <Grid container spacing={3}>
        {renderPhoto()}
      </Grid>
    </div>
  );
}

export default Photos;
