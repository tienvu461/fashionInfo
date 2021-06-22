/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { theme } from 'src/styles/theme';

const useStyles: () => Record<
  | 'nextBtn'
  | 'textBtn'
  | 'loading',
  string
> = makeStyles(() => ({
  nextBtn: {
    height: '60px',
    width: 'auto',
    borderRadius: 0,
    padding: '17px 33px',
  },
  textBtn: {
    textTransform: 'initial',
    [theme.breakpoints.down('md')]: {
      fontSize: '30px !important',
    },
    lineHeight: '25px',
    letterSpacing: '2.2px',
    fontWeight: 'normal',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  loading: {
    marginLeft: '16px'
  }
}));

export { useStyles as default };
