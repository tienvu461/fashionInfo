/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { black } from 'src/styles/theme';

const useStyles: () => Record<'root' | 'cardMagazine', string> = makeStyles(() => ({
  root: {
    width: '100%',
    boxShadow: 'none !important',
    borderRadius: '0 !important',
  },
  cardMagazine: {
    width: '100%',
    zIndex: 4,
  },
}));

export { useStyles as default };
