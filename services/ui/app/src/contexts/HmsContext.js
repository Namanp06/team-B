import React, { createContext, useEffect, useState } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import UiApiUtils from '@mern-starter/ui-swaggergen-utils';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { HmsLinearProgress } from '../components/HmsMuiComponents';
import {
    envUrlandPort,
    isAccessTokenExpired
} from '@mern-starter/helpers/js/helpers';

// API URLs
const apiUrl = envUrlandPort.app.api;
// Init API util
const uiApiUtils = new UiApiUtils({
    domain: apiUrl
});
// MUI styles
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        margin: theme.spacing(0),
        padding: theme.spacing(0)
    },
    progressBar: {
        textAlign: 'center',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0
    }
}));

// Define main context API
const HmsContext = createContext(uiApiUtils);
// Define main provider component
let HmsProvider = props => {
    const classes = useStyles();
    const currentUrl = useLocation().pathname;
    const [appStore, setAppStore] = useState({
        currentUrl,
        isLogin:
            Cookies.get('hms_acct') && Cookies.get('hms_reft') ? false : true,
        userDetails: null,
        uiApiUtils
    });

    useEffect(() => {
        if (appStore.isLogin) {
            props.history.push('/login');
        } else {
            try {
                // Get access_token and refresh_token from cookies
                const accessToken = Cookies.get('hms_acct');
                const refreshToken = Cookies.get('hms_reft');
                // Check if access_token is expired
                if (isAccessTokenExpired(jwt, accessToken)) {
                    // Renew the access_token using refresh_token
                    getNewToken(refreshToken);
                } else {
                    // Get user info details if access_token is valid
                    getUserInfo();
                }
            } catch (err) {
                // Something went wrong..., please try after some time.
            }
        }
    }, [appStore.isLogin]);

    const getUserInfo = async () => {
        try {
            // Set the token in auth header of util instance
            await setAuthHeader();
            // Get current user info
            let userInfoRes = await uiApiUtils.getUserinfo();
            userInfoRes = await userInfoRes.data;
            // Update the state
            setAppStore({
                ...appStore,
                isLogin: false,
                currentUrl: appStore.isLogin ? '/login' : currentUrl,
                userDetails: userInfoRes
            });
        } catch (err) {
            // Something went wrong while getting user info
        }
    };

    const getNewToken = async refreshToken => {
        try {
            let res = await uiApiUtils.postNewtoken({
                payload: { refreshToken }
            });
            res = await res.data;
            // Overwrite cookie values with new tokens
            Cookies.set('hms_acct', res.access_token, {
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict'
            });
            Cookies.set('hms_reft', res.refresh_token, {
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict'
            });
            // Reset the token in auth header of util instance
            appStore.uiApiUtils.setApiKey(`Bearer ${Cookies.get('hms_acct')}`);
            // Stop the loading icon
            setAppStore({ ...appStore, isLogin: false });
        } catch (err) {
            // Something went wrong while getting new access_token
        }
    };

    const setAuthHeader = async () => {
        const accessToken = Cookies.get('hms_acct');
        const refreshToken = Cookies.get('hms_reft');
        if (accessToken && refreshToken) {
            // Redirect to /newtoken route for new access_token request if expired
            if (isAccessTokenExpired(jwt, accessToken)) {
                getNewToken(refreshToken);
            } else {
                // Set the token in auth header of util instance
                appStore.uiApiUtils.setApiKey(`Bearer ${accessToken}`);
            }
        } else {
            // Something went wrong with access_token or refresh_token
            // OR, maybe user has manually cleared the session data from browser
            // So, in those cases, we need to request for a new token by requesting them to login AGAIN...!
            // To do that, we just need to refresh the page
            window.location.reload();
            return false;
        }
    };

    const showPogressBar = currentUrl !== '/login' && !appStore.userDetails;

    return (
        <Box className={showPogressBar ? classes.root : ''}>
            <HmsContext.Provider
                value={{
                    appStore,
                    setAppStore,
                    setAuthHeader
                }}
            >
                {showPogressBar ? (
                    <HmsLinearProgress className={classes.progressBar} />
                ) : (
                    props.children
                )}
            </HmsContext.Provider>
        </Box>
    );
};

HmsProvider = withRouter(HmsProvider);

export { HmsContext, HmsProvider };
