import React, { ReactChildren, ReactChild, useState } from 'react';
import {
 Accordion, AccordionDetails, AccordionSummary, Grid, Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './useStyles';

interface CommentProps {
  children: ReactChild | ReactChildren;
}

function CommentLayout(props: CommentProps): JSX.Element {
  const { children } = props;
  const classes = useStyles();
  const [isClick, setIsClick] = useState<boolean>(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };

    return (
      <Grid className={classes.root} container>
        <Grid className={classes.container} item lg={12} md={12} sm={12} xl={12} xs={12}>
          <Accordion className={classes.accordion}>
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
                <Typography className={classes.subText}>
                  <span className={classes.spanText}>Đăng nhập</span> để bình luận
                </Typography>
              </div>
            </div>
            <AccordionDetails className={classes.accordionDetails}>
              {children}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    );
}

export default CommentLayout;
