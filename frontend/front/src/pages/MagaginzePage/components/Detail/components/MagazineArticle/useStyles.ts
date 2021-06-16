/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { black } from 'src/styles/theme';

const useStyles: () => Record<
  'subTitleArticle' | 'divider' | 'headerText' | 'time' | 'mainTitle' | 'heartIcon' | 'authorArticle' | 'num' | 'flex',
  string
> = makeStyles(() => ({
  subTitleArticle: {
    paddingRight: '26px',
    fontWeight: 'bold',
    letterSpacing: '0.52px',
  },
  divider: {
    width: '60px',
    borderTop: '1px solid #000000',
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: '33px',

    color: '#000000',
  },
  time: {
    fontWeight: 'normal',
    letterSpacing: '0.991666px',
    paddingLeft: '26px',
  },
  mainTitle: {
    fontSize: '70px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 900,
    lineHeight: '87px',
    letterSpacing: '3.7px',
    textAlign: 'left',
    paddingTop: '22px',
  },
  heartIcon: {
    cursor: 'pointer',
  },
  authorArticle: {
    fontWeight: 'normal',
    letterSpacing: '0.991666px',
  },
  num: {
    fontFamily: 'Roboto Mono',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '24px',
    color: black,
    paddingLeft: '8px'
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export { useStyles as default };
