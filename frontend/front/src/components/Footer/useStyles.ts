/* eslint-disable import/no-unresolved */
import { makeStyles } from '@material-ui/core/styles';

const useStyles: () => Record<
  | 'root'
  | 'leftFooter'
  | 'field'
  | 'emailInput'
  | 'header'
  | 'buttonSocial'
  | 'listIcons'
  | 'icon'
  | 'links'
  | 'menu'
  | 'menuList'
  | 'titleHeader'
  | 'subTitle'
  | 'logoFooter',
  string
> = makeStyles(() => ({
  root: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#0D0D0D',
  },
  leftFooter: {
    // padding: '151px 0 52px 0',
  },
  header: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    lineHeight: '35px',
    letterSpacing: '1.2px',
    textAlign: 'left',
  },
  buttonSocial: {
    padding: 0,
  },
  field: {
    borderBottom: '1px solid #5c5c5c',
    height: '67.17px',
    width: '300px',

    '& .MuiInputBase-input': {
      color: '#FFFFFF',
      paddingBottom: '16px',
      paddingTop: '6px',
      fontSize: '24px',
    },

    '& .MuiInputLabel-formControl': {
      color: '#FFFFFF',
      opacity: 0.5,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '15px',
      lineHeight: '20px',
    },
  },
  emailInput: {
    paddingTop: '56.91px',
  },
  logoFooter: {
    textAlign: 'left',
    paddingTop: '134.92px',
  },
  listIcons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '176.44px',
  },
  icon: {},
  menu: {
    paddingRight: 0,
    paddingLeft: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  menuList: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  titleHeader: {
    paddingBottom: '60px',
  },
  subTitle: {
    paddingBottom: '21.22px',
  },
  links: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },
}));

export { useStyles as default };
