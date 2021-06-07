/* eslint-disable import/no-unresolved */
import { white, gray2 } from 'src/styles/theme';
import { makeStyles } from '@material-ui/core/styles';

const useStyles: () => Record<
  | 'container'
  | 'entertaimentHeader'
  | 'author'
  | 'entertaimentTitle'
  | 'headerTitle'
  | 'headerSubTitle'
  | 'authorName'
  | 'authorTime'
  | 'divide',
  string
> = makeStyles(() => ({
  container: {
    backgroundColor: gray2,
  },
  entertaimentHeader: {
    backgroundColor: white,
    height: '600px',
    display: 'flex'
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '45px',
  },
  entertaimentTitle: {
    textAlign: 'left',
  },
  headerTitle: {
    fontFamily: 'Darker Grotesque',
    fontStyle: 'normal',
    fontWeight: 900,
    lineHeight: '115px',
    letterSpacing: '3.2px',

    color: '#000000',
  },
  headerSubTitle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '22px',
    lineHeight: '23px',
    letterSpacing: '0.7px',
    paddingTop: '17px',

    color: '#000000',
  },
  authorName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',

    lineHeight: '33px',
    letterSpacing: '0.991666px',
    paddingRight: '26px',

    color: '#000000',
  },
  authorTime: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',

    lineHeight: '33px',
    letterSpacing: '0.991666px',
    paddingLeft: '26px',

    color: '#000000',
  },
  divide: {
    width: '60px',
    borderBottom: '1px solid #000000',
  },
}));

export { useStyles as default };
