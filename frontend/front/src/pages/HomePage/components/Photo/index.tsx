import React from 'react';
import {
  Paper,
  Grid,
  CardContent,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  Button,
  Typography,
} from '@material-ui/core';
import paper from '../../../../assets/images/paper.jpeg';
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
      <>
        {gallery.map(({ title = '', id = '' }) => (
          <Grid
            key={id}
            className={classes.gridItem}
            item
            md={4}
            sm={6}
            xs={12}
          >
            <Paper className={classes.paper}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.picture}
                    image={paper}
                    title='Contemplative Reptile'
                  />
                  <CardContent>
                    <Typography component='h2' gutterBottom variant='h5'>
                      {title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size='small'>Share</Button>
                  <Button size='small'>Learn More</Button>
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        ))}
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {renderPhoto()}
      </Grid>
    </div>
  );
};

export default Photo;
