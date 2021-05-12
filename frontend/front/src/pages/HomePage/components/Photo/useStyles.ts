/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
import { makeStyles, Theme } from '@material-ui/core/styles';
import { gray, paddingContainer } from '../../../../styles/theme';

const useStyles: () => Record<
  'root' | 'card' | 'paper' | 'picture' | 'gridItem',
  string
> = makeStyles((theme: Theme) => ({
  root: {
    height: 'auto',
    padding: paddingContainer,
    backgroundColor: gray,
  },
  card: {},
  paper: {},
  picture: {
    height: '600px',
  },
  gridItem: {
    paddingTop: '0 !important',
    paddingBottom: '24px !important',
  },
}));

export { useStyles as default };
