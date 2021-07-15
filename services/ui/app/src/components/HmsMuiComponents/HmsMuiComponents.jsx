import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import LinearProgress from '@material-ui/core/LinearProgress';
import { colors } from '@mern-starter/helpers/js/muiCommonStyles';

// Custom paper without border radius
const MuiPaper = withStyles(theme => ({
    root: {
        borderRadius: theme.spacing(0)
    }
}))(Paper);
// Export the customized paper component
export const HmsPaper = props => <MuiPaper {...props} />;

// Custom card without border radius, turquoise color box shadow and hover effect
const MuiCard = withStyles(theme => ({
    root: {
        borderRadius: theme.spacing(0),
        '&:hover': {
            boxShadow: `0 3px 0 0 ${colors.turquoise2}`,
            transform: 'scale(1.01)',
            transition: 'transform 0.35s'
        }
    }
}))(Card);
// Export the customized card component
export const HmsCard = props => <MuiCard {...props} />;

// Custom linear progress
const MuiLinearProgress = withStyles(theme => ({
    colorPrimary: {
        backgroundColor:
            theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
    },
    bar: {
        backgroundColor: colors.turquoise1
    }
}))(LinearProgress);
// Export the customized linear progress component
export const HmsLinearProgress = props => <MuiLinearProgress {...props} />;
