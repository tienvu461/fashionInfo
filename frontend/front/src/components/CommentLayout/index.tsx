/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { ReactChildren, ReactChild, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion, AccordionDetails, AccordionSummary, Grid, Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { isLoginToComment } from 'src/features/Login/LoginSlice';
import { RootState } from 'src/store/store';
import FormDialog from 'src/components/LoginPopup';
import useStyles from './useStyles';

interface CommentProps {
  children: ReactChild | ReactChildren;
  paramsId: string;
}

const CommentLayout: React.FunctionComponent<CommentProps> = (props) => {
  const { children, paramsId } = props;
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const [isClick, setIsClick] = useState<boolean>(true);
  const path = window.location.pathname;

  const loginStatus = useSelector((state: RootState) => state.login.loginResponse.status);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  const redirectLogin = () => {
    const getKey = path.split('/');

    dispatch(
      isLoginToComment({
        isComment: true,
        paramId: paramsId,
        key: getKey[1],
      })
    );
  };

  return (
    <Grid className={classes.root} container>
      <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
        <Accordion className={classes.accordion} expanded={isClick}>
          <div className={classes.accordionHeader}>
            <AccordionSummary aria-controls='panel1a-content' id='panel1a-header' onClick={handleClick}>
              <div className={classes.header}>
                <Typography className={classes.headerText} component='h4' variant='h4'>
                  Bình luận
                </Typography>
                <ExpandMoreIcon className={isClick ? classes.expandMore : classes.expandLess} />
              </div>
            </AccordionSummary>
            <div>
              {
                loginStatus === 200 ? null : (
                  <Typography className={classes.subText}>
                    <FormDialog redirectLogin={redirectLogin} />
                    để bình luận
                  </Typography>
                )
              }
            </div>
          </div>
          <AccordionDetails className={classes.accordionDetails}>{children}</AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default CommentLayout;
