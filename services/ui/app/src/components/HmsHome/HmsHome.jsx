import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Cookies from 'js-cookie';
import { HmsContext } from '../../contexts/HmsContext';

// MUI styles
const useStyles = makeStyles(theme => ({
    homeContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2.5, 0, 3),
        width: '78%',
        height: `calc(100vh - ${theme.spacing(16)}px)`,
        [theme.breakpoints.down('xs')]: {
            height: `calc(100vh - ${theme.spacing(15)}px)`
        }
    }
}));

const HmsHome = props => {
    const classes = useStyles();
    const { appStore } = useContext(HmsContext);
    const { isLogin, userDetails } = appStore || {};

    useEffect(() => {
        // Redirect to login page (default) if the user is not logged in
        if (!Cookies.get('hms_acct')) {
            props.history.push('/login');
        }
    }, []);

    return !isLogin ? (
        <Box className={classes.homeContainer}>
            <Typography variant="h4">{`Welcome ${userDetails.name}!`}</Typography>
            <Typography variant="h6">
                You can start editing <code>App.jsx</code> to build your own
                application using this boilerplate
            </Typography>
            <Box>
                For more, please refer{' '}
                <a
                    href="https://github01.hclpnp.com/hclsw-tango/mern-starter/blob/master/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    repo README
                </a>
            </Box>
        </Box>
    ) : null;
};

export default HmsHome;
