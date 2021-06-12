/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { ReactChildren, ReactChild, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
 Accordion, AccordionDetails, AccordionSummary, Grid, Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ROUTE_LOGIN } from 'src/constants';
import { isLoginToComment } from 'src/features/Photo/photoSlice';
import { RootState } from 'src/store/store';
import FormDialog from 'src/components/LoginPopup'
import useStyles from './useStyles';

interface CommentProps {
  children: ReactChild | ReactChildren;
  paramsId: string;
}

function CommentLayout(props: CommentProps): JSX.Element {
  const { children, paramsId } = props;
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const [isClick, setIsClick] = useState<boolean>(true);

  const loginStatus = useSelector((state: RootState) => state.login.loginResponse.status);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  const redirectLogin = () => {
    dispatch(
      isLoginToComment({
        isComment: true,
        photoId: paramsId,
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
                {loginStatus ? null : (
                  <Typography className={classes.subText}>
                    {/* <Link to={ROUTE_LOGIN} onClick={redirectLogin} className={classes.spanText}>
                      Đăng nhập
                    </Link> */}
                    <FormDialog />
                    để bình luận
                  </Typography>
                )}
              </div>
            </div>
            <AccordionDetails className={classes.accordionDetails}>{children}</AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    );
}

export default CommentLayout;
