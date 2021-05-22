/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { makeStyles, Theme } from '@material-ui/core/styles';
import { black } from '../../../../styles/theme';

const useStyles: () => Record<'list' | 'linkText' | 'icon', string> = makeStyles((theme: Theme) => ({
  list: { width: '100%', },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: black,
  },
  icon: {},
}));

export { useStyles as default };
