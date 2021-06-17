/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React, { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Grid } from '@material-ui/core';
import { Timeline } from '@material-ui/lab';
import { RootState } from 'src/store/store';
import Ava1 from 'src/assets/images/menAva.jpg';
import CommentBox from 'src/components/CommentBox';
import { commentMagazineAction } from 'src/features/Magazine/MagazineAction';
import CommentParrent from './CommentParrent';

import useStyles from './useStyles';

function Comments(): JSX.Element {
    const classes = useStyles();
    const dispatch = useDispatch<any>();
    const [textArea, setTextArea] = useState<string>('');
    const valueRef = useRef<HTMLInputElement>();
    const loginStatus = useSelector((state: RootState) => state.login.loginResponse.status);
    const userID = useSelector((state: any) => state.login.loginResponse.userID);
    const magazineDetail = useSelector((state: RootState) => state.magazine.magazineDetail);
    const {
      id: magazineCardId = '',
      comments = []
    } = magazineDetail;

    const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      let newText = '';
      if (text.length <= 255) {
        newText = text;
      } else {
        newText = text.substring(0, 255);
      }
      setTextArea(newText);
    };

    const onKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        valueRef.current?.blur();
        const payload: {
          user_id: string;
          news_id: string | number;
          content: string;
          parent: null;
        } = {
          user_id: userID,
          news_id: magazineCardId,
          content: textArea,
          parent: null,
        };
        dispatch(commentMagazineAction(payload));
        setTextArea('');
      }
    };

    const listComments = useMemo(
      () => (
        <>
          {isEmpty(comments) ? null : (
            <>
              {comments.map((item: any, index: number) => {
                const { cmt_id: cmtID = '' } = item;
                return (
                  <CommentParrent
                    key={cmtID}
                    cmtProps={{ ...item, avatar: Ava1, cmtLength: comments.length, lastCmt: index }}
                    userID={userID}
                  />
                );
              })}
            </>
          )}
        </>
      ),
      [comments]
    );

    return (
      <Grid className={classes.root}>
        <Timeline className={classes.rootTimeline}>{listComments}</Timeline>
        {loginStatus === 200 ? (
          <Timeline className={classes.rootTimeline}>
            <CommentBox
              onTextFieldChange={onTextFieldChange}
              onKeyPress={onKeyPress}
              valueRef={valueRef}
              textArea={textArea}
              keyClassName='timeline'
            />
          </Timeline>
        ) : null}
      </Grid>
    );
}

export default Comments;
