/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
import { black } from 'src/styles/theme';

const useStyles: () => Record<
  'card' | 'picture' | 'actions' | 'left' | 'leftActions' | 'right' | 'num' | 'icon',
  string
> = makeStyles(() => ({
  card: {
    width: '100%',
    boxShadow: 'none !important',
    borderRadius: '0 !important',
    background: 'transparent',
  },
  picture: {
    height: '100%',
    zIndex: 4,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px',
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  right: { cursor: 'pointer' },
  leftActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '30px',
  },
  icon: {
    paddingRight: '8px',
    cursor: 'pointer',
  },
  num: {
    fontFamily: 'Roboto Mono',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '24px',
    color: black,
  },
}));

export { useStyles as default };
