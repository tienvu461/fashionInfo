/* eslint-disable operator-linebreak */
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles: () => Record<
  'root' | 'card' | 'paper' | 'picture' | 'gridItem',
  string
> = makeStyles((theme: Theme) => ({
  root: {
    height: 'auto',
    padding: '0 200px',
    backgroundColor: '#EEEEEE',
    // flexGrow: 1,
  },
  card: {},
  paper: {
    // width: '480px',
  },
  picture: {
    // paddingBottom: '40px',
    height: '600px',
    // height: 'fit-content',
  },
  gridItem: {
    paddingTop: '0 !important',
    paddingBottom: '24px !important',
  },
}));

export { useStyles as default };
