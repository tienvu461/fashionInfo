import { makeStyles } from '@material-ui/core/styles';

const useStyles: () => Record<
    | 'spanText'
    | 'field',
    string
> = makeStyles(() => ({
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
        '&. .MuiDialog-paperWidthSm': {
            maxWidth: 'false',
            backgroundColor: '#000000'
        }
    }
}));

export { useStyles as default };
