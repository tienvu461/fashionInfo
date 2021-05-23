/* eslint-disable import/no-unresolved */
/* eslint-disable object-curly-newline */
import { makeStyles } from '@material-ui/core/styles';
import { pdXL, pdSM, pdLG, pdMD, theme, black } from 'src/styles/theme';

const useStyles: () => Record<
  'root' | 'header' | 'headerText' | 'accordion' | 'accordionDetails' | 'expandLess' | 'expandMore',
  string
> = makeStyles(() => ({
  root: {
    height: 'auto',

    // responsive
    [theme.breakpoints.up('sm')]: {},
    [theme.breakpoints.up('md')]: {},
    [theme.breakpoints.up('lg')]: {},
    [theme.breakpoints.up('xl')]: {},
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  headerText: {
    letterSpacing: '1px',
    color: black,
    lineHeight: '36px',
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: 'Roboto',
    paddingRight: '17px',
  },
  accordion: {
    '&.MuiPaper-elevation1': {
      boxShadow: 'none',
    },
  },
  accordionDetails: {
    paddingTop: '62px',
  },
  expandLess: {
    transform: 'rotate(0deg)',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontSize: '40px',
  },
  expandMore: {
    transform: 'rotate(180deg)',
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontSize: '40px',
  },
}));

export { useStyles as default };
