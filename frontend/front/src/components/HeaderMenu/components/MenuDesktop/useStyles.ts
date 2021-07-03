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
      '& .MuiMenu-paper': {
        width: '150px',
        height: '40px',
        borderRadius: 'inherit',
        top: '80px !important',
        left: '1520px !important',
      },
      '& .MuiList-padding': {
        paddingTop: '5px',
        paddingBottom: 0
      }
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center',
    },
    linkItem: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      color: '#373F41',
      letterSpacing: '0.2px',
      lineHeight: '18px',
      fontSize: '14px',
      paddingLeft: '13.5px !important',
    },
  }));
export { useStyles as default };
