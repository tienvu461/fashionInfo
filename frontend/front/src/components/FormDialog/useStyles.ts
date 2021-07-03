import { makeStyles } from '@material-ui/core/styles';

const useStyles: () => Record<
    | 'spanText'
    | 'field',
    string
> = makeStyles((theme) => ({
    spanText: {
        lineHeight: '19px',
        fontFamily: 'Roboto',
        cursor: 'pointer',
        fontStyle: 'normal',
        color: '#2E4A91',
        textDecoration: 'none',
        paddingRight: '4px',
    },
    field: {
        padding: '0px',
        // width: '1260px',
        [theme.breakpoints.up('xs')]: {
            // width: '400px',
        },
        [theme.breakpoints.up('sm')]: {
            // width: '400px',
        },
        [theme.breakpoints.up('md')]: {
            // width: '400px',
        },
        [theme.breakpoints.up('lg')]: {
            width: '1260px',
        },
        [theme.breakpoints.up('xl')]: {
            width: '1260px',
        }
    },
}));

export { useStyles as default };
