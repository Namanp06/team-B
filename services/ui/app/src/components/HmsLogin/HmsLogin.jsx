import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import { HmsContext } from '../../contexts/HmsContext';
import { HmsPaper } from '../HmsMuiComponents';
import muiCommonStyles from '@mern-starter/helpers/js/muiCommonStyles';
import { safeRedirect } from '@mern-starter/helpers/js/helpers';
import './HmsLogin.scss';

// MUI styles
const useStyles = makeStyles(theme => ({
    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 128px)',
        width: '100vw',
        margin: 0,
        [theme.breakpoints.down('xs')]: {
            height: 'calc(100vh - 120px)'
        }
    },
    loginFormContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        padding: theme.spacing(7.5),
        [theme.breakpoints.down('sm')]: {
            width: '50%',
            padding: theme.spacing(4)
        },
        [theme.breakpoints.down('xs')]: {
            width: '92%',
            padding: theme.spacing(4)
        }
    },
    loginForm: {
        width: '100%'
    },
    loginToAppMsg: {
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(2.5)
        }
    }
}));

const HmsLogin = props => {
    const classes = useStyles();
    const commonClasses = muiCommonStyles();
    const { appStore } = useContext(HmsContext);
    const { uiApiUtils } = appStore || {};

    useEffect(() => {
        // Check if the user is already logged in and redirect to home page (default)
        if (Cookies.get('hms_acct')) {
            props.history.push('/');
        }
    }, []);

    const handleOnSubmit = e => {
        e.preventDefault();
        safeRedirect(`${uiApiUtils.domain}/login`);
    };

    return (
        <Box className={`hms-login-container ${classes.loginContainer}`}>
            <HmsPaper className={classes.loginFormContainer}>
                <form
                    className={classes.loginForm}
                    name="hms-login-form"
                    autoComplete="off"
                    noValidate
                    onSubmit={handleOnSubmit}
                >
                    <Typography
                        variant="h5"
                        className={`${classes.loginToAppMsg} ${commonClasses.mb4}`}
                    >
                        Login to MERN Starter App
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={commonClasses.loginButton}
                    >
                        Click here to login
                    </Button>
                </form>
            </HmsPaper>
        </Box>
    );
};

export default HmsLogin;
