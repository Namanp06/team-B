import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// MUI styles
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(4, 2),
        height: `calc(100vh - ${theme.spacing(16)}px)`,
        [theme.breakpoints.down('xs')]: {
            height: `calc(100vh - ${theme.spacing(15)}px)`
        }
    },
    errorCode: {
        fontSize: theme.spacing(12),
        color: '#d89958',
        marginRight: theme.spacing(4),
        transform: 'skew(-10deg, 10deg)',
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(5)
        }
    },
    errorInfo: {
        fontSize: theme.spacing(8),
        transform: 'skew(10deg, -10deg)',
        [theme.breakpoints.down('xs')]: {
            fontSize: theme.spacing(3)
        }
    }
}));

const HmsNotFound = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <p className={classes.errorCode}>404</p>
            <p className={classes.errorInfo}>Page Not Found...!</p>
        </div>
    );
};

export default HmsNotFound;
