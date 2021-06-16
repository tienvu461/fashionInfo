/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';
// import { theme } from 'src/styles/theme';

const useStyles: () => Record<'subTitleArticle' | 'divider' | 'headerText' | 'time' | 'mainTitle', string> = makeStyles(
  () => ({
    subTitleArticle: {
      paddingRight: '26px',
      fontWeight: 'bold',
      letterSpacing: '0.52px',
    },
    divider: {
      width: '60px',
      borderTop: '1px solid #000000',
    },
    headerText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      lineHeight: '33px',

      color: '#000000',
    },
    time: {
      fontWeight: 'normal',
      letterSpacing: '0.991666px',
      paddingLeft: '26px',
    },
    mainTitle: {
      fontSize: '70px',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 900,
      lineHeight: '87px',
      letterSpacing: '3.7px',
      textAlign: 'left',
      paddingTop: '22px'
    },
  })
);

export { useStyles as default };
