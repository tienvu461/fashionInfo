import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles: () => Record<'header', string> = makeStyles(
  (theme: Theme) => ({
    header: {
      width: '100%',
    },
  })
);

export { useStyles as default };
