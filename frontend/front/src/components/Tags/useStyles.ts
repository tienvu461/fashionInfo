/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { blackThin, gray1, theme } from 'src/styles/theme';

const useStyles: () => Record<
    'tag'
  | 'tags'
  | 'tagText',
  string
> = makeStyles(() => ({
  tag: {
    width: 'fit-content',
    background: gray1,
    padding: '3px 15px',
    marginRight: '4px',
    cursor: 'pointer',

    // responsive
    [theme.breakpoints.down('xs')]: {
      marginBottom: '4px',
    },
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '80px',
  },
  tagText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '36px',

    alignItems: 'center',
    letterSpacing: '1px',
    color: blackThin,
  },
}));

export { useStyles as default };
