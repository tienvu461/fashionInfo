import {
    makeStyles,
    Theme,
} from '@material-ui/core/styles';

const useStyles: () => Record<
    | 'root'
    | 'leftRegister'
    | 'registerImage'
    | 'rightRegister'
    | 'setWidthField'
    | 'savepassword'
    | 'button'
    | 'small'
    | 'socialButton'
    | 'title'
    | 'form'
    | 'fontManual'
    | 'field'
    | 'submit'
    | 'link'
    | 'line'
    | 'titleLogin',
    // | 'paper'
    // | 'avatar'
    // | 'header'
    // | 'titleLogin'
    string
> = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        height: 'auto',
    },
    leftRegister: {
        height: 'fit-content',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    registerImage: {
        width: '100%',
    },
    rightRegister: {
        [theme.breakpoints.up('xs')]: {
            // background: green[500],
            // border: '10px solid #fafafa',
            paddingTop: '40px'
        },
        [theme.breakpoints.up('sm')]: {
            // background: pink[500],
            border: '10px solid #fafafa',
            paddingTop: '40px'
        },
        [theme.breakpoints.up('md')]: {
            // background: red[500],
            paddingTop: '40px'
        },
        [theme.breakpoints.up('lg')]: {
            // background: blue[500],
            paddingTop: '40px',
        },
        [theme.breakpoints.up('xl')]: {
            // background: orange[500],
            paddingTop: '80px',
        }
    },
    setWidthField: {
        [theme.breakpoints.up('xs')]: {
            width: '400px',
        },
        [theme.breakpoints.up('sm')]: {
            // width: '400px',
        },
        [theme.breakpoints.up('md')]: {
            // width: '400px',
        },
        [theme.breakpoints.up('lg')]: {
            // width: '400px',
        },
        [theme.breakpoints.up('xl')]: {
            // width: '400px',
        }
    },
    titleLogin: {
        fontSize: '30px',
        color: '#2D3748',
        paddingBottom: '33px',
        fontFamily: 'Roboto',
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '10px',
        }
    },
    savepassword: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: '0px 10px',
        }
    },
    button: {
        width: '175px',
        height: '50px',
        backgroundColor: '#FFFFFF',
        [theme.breakpoints.down('sm')]: {
            width: '155px',
        }
    },
    small: {
        width: theme.spacing(2),
        height: theme.spacing(2),
    },
    socialButton: {
        textTransform: 'none',
        fontFamily: 'Roboto',
        fontSize: '18px',
    },
    title: {
        paddingRight: '20px',
        paddingLeft: '20px',
        fontFamily: 'Roboto',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            padding: '0px 10px',
        }
    },
    fontManual: {
        fontFamily: 'Roboto',
        textAlign: 'left',
    },
    field: {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E8E8E8',
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000000',
        },
        '& .MuiOutlinedInput-input': {
            color: '#000000',
            fontFamily: 'Roboto',
        },
        '&:hover .MuiOutlinedInput-input': {
            color: '#000000',
        },
        '& .MuiInputLabel-outlined': {
            color: '#000000',
        },
        '&:hover .MuiInputLabel-outlined': {
            color: '#000000',
        },

        // TextField select
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
        // Helper Text
        '& .MuiFormHelperText-root': {
            color: '#FF0000',
            fontFamily: 'Roboto',
            marginLeft: '0px',
        },
        width: '100%',
        height: '50px',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#383838',
        color: 'white',
        '&:hover': {
            backgroundColor: 'gray',
        },
        '&.MuiButton-root': {
            padding: '15px 0px',
        },
    },
    link: {
        color: '#2C5282',
    },
    line: {
        height: '1px',
        width: '52px',
        // border- width: 0;
        // color: 'gray';
        // backgroundColor: 'gray';
        margin: '0px',
    }
    // paper: {
    //     margin: theme.spacing(8, 4),
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'left',
    //     width: '390px',
    // },
    // avatar: {
    //     margin: theme.spacing(1),
    //     backgroundColor: theme.palette.secondary.main,
    // },
    // form: {
    //     width: '100%',
    //     marginTop: theme.spacing(1),
    // },
    // submit: {
    //     margin: theme.spacing(3, 0, 2),
    //     backgroundColor: '#383838',
    //     color: 'white',
    //     '&:hover': {
    //         backgroundColor: 'gray',
    //     },
    //     '&.MuiButton-root': {
    //         padding: '15px 0px',
    //     },
    // },
    // field: {
    //     '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    //         borderColor: '#E8E8E8',
    //     },
    //     '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    //         borderColor: '#000000',
    //     },
    //     '& .MuiOutlinedInput-input': {
    //         color: '#000000',
    //         fontFamily: 'Roboto',
    //     },
    //     '&:hover .MuiOutlinedInput-input': {
    //         color: '#000000',
    //     },
    //     '& .MuiInputLabel-outlined': {
    //         color: '#000000',
    //     },
    //     '&:hover .MuiInputLabel-outlined': {
    //         color: '#000000',
    //     },

    //     // TextField select
    //     '& .MuiTextField-root': {
    //         margin: theme.spacing(1),
    //     },
    //     // Helper Text
    //     '& .MuiFormHelperText-root': {
    //         color: '#FF0000',
    //         fontFamily: 'Roboto',
    //     },
    //     width: '390px',
    //     height: '50px',
    // },
    // link: {
    //     color: '#2C5282',
    // },
    // small: {
    //     width: theme.spacing(2),
    //     height: theme.spacing(2),
    // },
    // socialButton: {
    //     textTransform: 'none',
    //     fontFamily: 'Roboto',
    //     fontSize: '18px',
    // },
    // button: {
    //     width: '175px',
    //     height: '50px',
    //     backgroundColor: '#FFFFFF',
    // },
    // savepassword: {
    //     paddingTop: '8px',
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    // },
    // header: {
    //     fontSize: '16px',
    //     color: '#2D3748',
    //     fontFamily: 'Roboto',
    // },
    // titleLogin: {
    //     fontSize: '30px',
    //     color: '#2D3748',
    //     paddingBottom: '33px',
    //     fontFamily: 'Roboto',
    // },
    // fontManual: {
    //     fontFamily: 'Roboto',
    // },
    // title: {
    //     paddingRight: '20px',
    //     paddingLeft: '20px',
    //     fontFamily: 'Roboto',
    // },
    // errorText: {
    //     fontFamily: 'Roboto',
    //     color: '#FF0000',
    // },
}));

export { useStyles as default };
