/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import useStyles from './useStyles';

interface IBtnProps {
  handleClick: any;
  loading: boolean;
}

const BtnViewMore: React.FunctionComponent<IBtnProps> = (props) => {
  const { handleClick, loading } = props;
  const classes = useStyles();
  return (
    <Button
      className={classes.nextBtn}
      endIcon={loading ? <CircularProgress className={classes.loading} /> : null}
      onClick={() => handleClick('next')}
      variant='contained'
    >
      <Typography className={classes.textBtn} component='h4' variant='h4'>
        Xem thêm
      </Typography>
    </Button>
  );
};

export default BtnViewMore;
