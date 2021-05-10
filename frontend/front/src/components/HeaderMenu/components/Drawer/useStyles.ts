import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles: () => Record<
  'list' | 'linkText' | 'icon',
  string
> = makeStyles((theme: Theme) => ({
  list: {
    width: '100%',
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: '#000',
  },
  icon: {},
}));

export { useStyles as default };
