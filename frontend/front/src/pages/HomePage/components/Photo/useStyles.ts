/* eslint-disable operator-linebreak */
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles: () => Record<'root' | 'layout' | 'picture', string> =
  makeStyles((theme: Theme) => ({
    root: {
      // width: '100%',
      height: 'auto',
      padding: '0 200px',
      backgroundColor: '#EEEEEE',
      flexGrow: 1,
    },
    layout: {
      height: '600px',
    },
    picture: {
      background: '#C4C4C4',
      width: '440px',
      height: '600px',
      // height: '100%',
    },
  }));

export { useStyles as default };
