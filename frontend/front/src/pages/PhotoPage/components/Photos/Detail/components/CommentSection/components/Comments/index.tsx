/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Timeline,
} from '@material-ui/lab';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import Ava1 from 'src/assets/images/menAva.jpg';
import Ava2 from 'src/assets/images/womenAva.jpg';
import Ava3 from 'src/assets/images/beck.jpeg';

import useStyles from './useStyles';
import CommentParrent from './CommentParrent';

function Comments(): JSX.Element {
  const classes = useStyles();
  const commentsList = useSelector((state: RootState) => state.photo.photoDetail.comments);
  console.log(commentsList);

  const fakeComments = [
    {
      cmt_id: 1,
      user_id: 'A',
      user_name: 'A Nguyen',
      content: `Ngày xưa mình dùng con Canon T60 để in ảnh cho khách, dùng mực ngoài Pigment khoảng 100k/100ml và 6 màu. 
      In đẹp màu bền tuy nhiên phải dùng giấy loại xịn hoặc phải ép Plastic.`,
      reply: [],
      ava: Ava1,
    },
    {
      cmt_id: 2,
      user_id: 'B',
      user_name: 'B Nguyen',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      reply: [
        {
          cmt_child_id: 1,
          user_id: 'A',
          user_name: 'A Nguyen',
          nestedContent: `Ngày xưa mình dùng con Canon T60 để in ảnh cho khách, dùng mực ngoài Pigment khoảng 100k/100ml và 6 màu. 
      In đẹp màu bền tuy nhiên phải dùng giấy loại xịn hoặc phải ép Plastic.`,
          ava: Ava1,
        },
      ],
      ava: Ava2,
    },
    {
      cmt_id: 3,
      user_id: 'C',
      user_name: 'C Nguyen',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      reply: [],
      ava: Ava3,
    },
  ];

  return (
    <Grid className={classes.root}>
      <Timeline className={classes.rootTimeline}>
        {fakeComments.map((item: any) => {
          const { cmt_id: cmtID = '' } = item;
          return <CommentParrent key={cmtID} cmtProps={{ ...item }} />;
        })}
      </Timeline>
    </Grid>
  );
}

export default Comments;
