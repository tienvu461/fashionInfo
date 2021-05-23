import React, { useState } from 'react';
import {
 Accordion, AccordionDetails, AccordionSummary, Grid, Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './useStyles';

function Comment(): JSX.Element {
  const classes = useStyles();
  const [isClick, setIsClick] = useState<boolean>(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };

    return (
      <Grid>
        <Accordion className={classes.accordion}>
          <AccordionSummary aria-controls='panel1a-content' id='panel1a-header' onClick={handleClick}>
            <div className={classes.header}>
              <Typography className={classes.headerText} component='h4' variant='h4'>
                Bình luận
              </Typography>
              <ExpandMoreIcon className={isClick ? classes.expandMore : classes.expandLess} />
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
              leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
}

export default Comment;
