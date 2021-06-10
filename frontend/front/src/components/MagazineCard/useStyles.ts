/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
// import { black } from 'src/styles/theme';

const useStyles: () => Record<'root' | 'cardMagazine' | 'textTitle' | 'author' | 'time' | 'divider', string> = makeStyles(() => ({
    root: {
      width: '100%',
      boxShadow: 'none !important',
      borderRadius: '0 !important',
    },
    cardMagazine: {
      width: '100%',
      zIndex: 4,
    },
    textTitle: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      lineHeight: '33px',

      color: '#000000',
    },
    author: {
      fontWeight: 'bold',
      letterSpacing: '0.52px',
      paddingRight: '26px',
    },
    time: {
      fontWeight: 'normal',
      letterSpacing: '0.991666px',
      paddingLeft: '26px'
    },
    divider: {
      width: '60px',
      borderTop: '1px solid #000000',
    },
  }));

export { useStyles as default };
