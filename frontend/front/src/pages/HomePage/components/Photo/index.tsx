import React from 'react';
import { Grid, Paper } from '@material-ui/core';

import useStyles from './useStyles';

const Photo = (): JSX.Element => {
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
      // <Grid item xs={12}>
      //   <Grid container justify='space-between' spacing={1}>
      //     {gallery.map(({ title = '', id = 0 }) => (
      //       <Grid key={id} item>
      //         <Paper className={classes.picture}>{title}</Paper>
      //       </Grid>
      //     ))}
      //   </Grid>
      // </Grid>
      <Grid container style={{ backgroundColor: 'red' }}>
        <Grid
          alignItems='center'
          container
          direction='row'
          item
          justify='center'
          spacing={3}
          xs={12}
        >
          {gallery.map(({ title = '', id = 0 }) => (
            <Grid key={id} item xs={4}>
              <Paper className={classes.picture}>{title}</Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  };

  return <div className={classes.root}>{renderPhoto()}</div>;
};

export default Photo;
