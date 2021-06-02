/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import { makeStyles, Theme } from '@material-ui/core/styles';
import { black } from 'src/styles/theme';

const useStyles: () => Record<'menuBtn' | 'list' | 'linkText' | 'icon', string> = makeStyles((theme: Theme) => ({
  list: { width: '100%' },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: black,
  },
  icon: {},
  menuBtn: {
    height: '80px',
    color: '#000',
    cursor: 'pointer'
  },
}));

export { useStyles as default };
