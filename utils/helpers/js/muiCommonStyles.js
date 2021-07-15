import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

/**
 * Base colors
 */
export const colors = {
    white: '#FFFFFF',
    white2: '#F7F7F7',
    white3: '#E2E7EE80',
    loginGrad1: '#00464C',
    loginGrad2: '#008E94',
    loginUnderline: '#E0E86A',
    errorText: red[500],
    turquoise1: '#037780',
    turquoise2: '#0CB0B0',
    turquoise3: '#47DECF',
    turquoise4: '#0CB0B0',
    turquoise5: '#047B88',
    header: '#035F69',
    chip: '#017175',
    black: '#000000',
    black2: '#00000026',
    black3: '#00000040',
    grey: '#CCCCCC',
    grey1: '#DDDDDD',
    grey2: '#8F8F8F',
    grey3: '#F1F5F9',
    blue1: '#4780FF',
    blue2: '#0780C7'
};

/**
 * Custom element sizes; e.g.: Avatar
 * n=[1, 2, ..., infinity] where 1 = 8px
 */
export const sizes = {};

/**
 * By MUI standard, base(b)=8 and n=[1, 2, ..., infinity]
 * So, 'marginTop: theme.spacing(1)' = 'marginTop: 8px' where n=1
 * Decimal (.) is represented with zero (0). E.g.: mr0625 means 'marginRight: theme.spacing(0.625)'
 */
export default makeStyles(theme => ({
    mt: { marginTop: `${theme.spacing(1)}px !important` },
    mt2: { marginTop: `${theme.spacing(2)}px !important` },
    mt3: { marginTop: `${theme.spacing(3)}px !important` },
    mt305: { marginTop: `${theme.spacing(3.5)}px !important` },
    mr: { marginRight: `${theme.spacing(1)}px !important` },
    mr2: { marginRight: `${theme.spacing(2)}px !important` },
    mb: { marginBottom: `${theme.spacing(1)}px !important` },
    mb2025: { marginBottom: `${theme.spacing(2.25)}px !important` },
    mb1075: { marginBottom: `${theme.spacing(1.75)}px !important` },
    mb2: { marginBottom: `${theme.spacing(2)}px !important` },
    mb205: { marginBottom: `${theme.spacing(2.5)}px !important` },
    mb3: { marginBottom: `${theme.spacing(3)}px !important` },
    mb4: { marginBottom: `${theme.spacing(4)}px !important` },
    mb5: { marginBottom: `${theme.spacing(5)}px !important` },
    mb6: { marginBottom: `${theme.spacing(6)}px !important` },
    ml3: { marginLeft: `${theme.spacing(3)}px !important` },
    errorText: {
        display: 'inline-flex',
        color: colors.errorText,
        fontSize: '0.875rem',
        marginTop: '0.1875rem',
        marginLeft: '0.875rem',
        marginRight: '0.875rem'
    },
    loginButton: {
        background: `transparent linear-gradient(91deg, ${colors.loginGrad1} 0%, ${colors.loginGrad2} 100%) 0% 0% no-repeat padding-box`,
        color: colors.white,
        '&:hover': {
            background: `transparent linear-gradient(91deg, ${colors.loginGrad1} 0%, ${colors.loginGrad2} 100%) 0% 0% no-repeat padding-box`,
            color: colors.white
        }
    },
    verticalEllipsis: {
        display: '-webkit-box',
        maxHeight: '300px',
        maxWidth: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        '-webkit-line-clamp': 4,
        '-webkit-box-orient': 'vertical'
    },
    verticalEllipsis6: {
        display: '-webkit-box',
        maxHeight: '300px',
        maxWidth: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        '-webkit-line-clamp': 6,
        '-webkit-box-orient': 'vertical'
    },
    inputEllipsis: {
        display: 'inline-block',
        width: theme.spacing(24.5),
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        '@media only screen and (max-width: 768px)': {
            width: theme.spacing(60)
        },
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(20)
        }
    },
    inputEllipsis2: {
        display: 'inline-block',
        width: theme.spacing(20.5),
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        '@media only screen and (max-width: 768px)': {
            width: theme.spacing(60)
        },
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(20)
        }
    },
    inputEllipsis3: {
        display: 'inline-block',
        width: theme.spacing(45),
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        '@media only screen and (max-width: 768px)': {
            width: theme.spacing(67.5)
        },
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(32.5)
        }
    },
    prodChip: {
        backgroundColor: colors.loginGrad2,
        color: colors.white2
    },
    preProdChip: {
        backgroundColor: colors.grey2,
        color: colors.white2
    },
    testChip: {
        backgroundColor: colors.blue2,
        color: colors.white2
    },
    envIcon: {
        color: colors.white,
        height: theme.spacing(2),
        width: theme.spacing(2)
    },
    noProductLogoBg: {
        backgroundColor: 'transparent'
    },
    envStatusIcon: {
        position: 'absolute',
        top: theme.spacing(3),
        right: theme.spacing(2.25),
        height: theme.spacing(2),
        width: theme.spacing(2),
        color: theme.palette.success.main,
        '&.warning': {
            color: theme.palette.warning.main
        },
        '&.error': {
            color: theme.palette.error.main
        }
    }
}));
