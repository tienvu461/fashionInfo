/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { black, white } from 'src/styles/theme';

const useStyles: () => Record<'titleHeadLine', string> = makeStyles(() => ({
  titleHeadLine: {
    fontStyle: 'normal',
    fontWeight: 900,
    lineHeight: '115px',
    textAlign: 'left',
    letterSpacing: '3.2px',

    color: black,
  },
}));

export { useStyles as default };
