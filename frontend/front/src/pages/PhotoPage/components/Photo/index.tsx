import React from 'react';
import {
  Paper,
  Grid,
  // CardContent,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  // Button,
  // Typography,
  // IconButton,
} from '@material-ui/core';

import BannerPic from '../../../../assets/images/photos/hotPic.jpg';
import HeartIcon from '../../../../assets/images/heart.svg';
import CommentIcon from '../../../../assets/images/comment.svg';
import ShareIcon from '../../../../assets/images/share.svg';

import useStyles from './useStyles';
import './_photo.scss';

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
        {gallery.map(({ id = '' }, index) => (
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
            <Paper className={classes.paper}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.picture}
                    image={BannerPic}
                    title='Contemplative Reptile'
                  />
                  {/* <CardContent>
                    <Typography component='h2' gutterBottom variant='h5'>
                      {title}
                    </Typography>
                  </CardContent> */}
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                  <div className={classes.actions}>
                    <div className={classes.left}>
                      <div className={classes.leftActions}>
                        <img
                          alt='heart-icon'
                          className={classes.icon}
                          src={HeartIcon}
                        />
                        <div>8</div>
                      </div>
                      <div className={classes.leftActions}>
                        <img
                          alt='comment-icon'
                          className={classes.icon}
                          src={CommentIcon}
                        />
                        <div>11</div>
                      </div>
                    </div>
                    <div className={classes.right}>
                      <img alt='share-icon' src={ShareIcon} />
                    </div>
                    {/* <IconButton aria-label='comment' size='medium'>
                      <img alt='share-icon' src={ShareIcon} />
                    </IconButton> */}
                  </div>
                </CardActions>
              </Card>
            </Paper>
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
};

export default Photo;
