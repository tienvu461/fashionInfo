/* eslint-disable implicit-arrow-linebreak */
import {
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';

const useStyles: () => Record<
'menu'
| 'menuItem'
| 'linkItem',
string> = makeStyles(() =>
  createStyles({
    menu: {
      top: '62px !important',
      left: '40px !important',
      '& .MuiMenu-paper': {
        width: '200px',
      }
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    linkItem: {
      fontFamily: 'Roboto',
      fontSize: '14px',
      paddingTop: '5px !important',
      paddingLeft: '5px !important',
    },
  }));
export { useStyles as default };
