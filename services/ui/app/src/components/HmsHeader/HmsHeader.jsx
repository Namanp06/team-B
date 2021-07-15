import React, { useState, useEffect, Fragment, useContext } from 'react';
import { withRouter, useLocation, Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Cookies from 'js-cookie';
import { HmsContext } from '../../contexts/HmsContext';
import { userMaleDP } from '@mern-starter/data-sample/data/imgDataURI';
import {
    getDisplayName,
    logoutAndRedirect
} from '@mern-starter/helpers/js/helpers';
import { colors } from '@mern-starter/helpers/js/muiCommonStyles';

const hmsVersion = 'MERN Starter v1.0.0';
const drawerWidth = 300;
const appBarMinHeight = 64;
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        [`& fieldset`]: {
            borderRadius: 0
        }
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
        [theme.breakpoints.down('xs')]: {
            marginRight: 0
        }
    },
    toolbar: theme.mixins.toolbar,
    toolbarTop: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.header,
        padding: theme.spacing(1.25, 1),
        '& img': {
            [theme.breakpoints.down('sm')]: {
                marginLeft: '3rem'
            }
        }
    },
    drawerPaper: {
        width: drawerWidth
    },
    logoContainer: {
        height: '100%'
    },
    hmsLogo: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        textDecoration: 'none',
        '& > img': {
            height: theme.spacing(3.75),
            width: theme.spacing(38),
            [theme.breakpoints.down('xs')]: {
                width: theme.spacing(40.5)
            }
        },
        '&:visited, &:active, &:focus': {
            color: colors.white
        }
    },
    hmsBrandLogo: {
        display: 'flex',
        alignItems: 'center',
        height: theme.spacing(2.75),
        width: theme.spacing(5.25),
        marginRight: theme.spacing(1),
        backgroundImage: `url(${
            require('../../assets/images/hclsw-brand-white.png').default
        })`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    hmsBrandName: {
        color: colors.white,
        fontSize: theme.spacing(3),
        '& > span:first-child': {
            opacity: 0.7,
            marginRight: theme.spacing(0.5)
        }
    },
    hmsDesktopNavItemsContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    hmsDesktopAppbarNavItems: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    hmsDesktopAppbarNavItemsLeft: {
        flex: 1,
        justifyContent: 'center'
    },
    hmsDesktopAppbarNavItemsRight: {
        justifyContent: 'flex-end'
    },
    hmsDesktopAppbarNavItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        minHeight: appBarMinHeight,
        fontSize: theme.spacing(1.5),
        textTransform: 'uppercase',
        textDecoration: 'none',
        letterSpacing: theme.spacing(0.375),
        color: '#fff',
        outline: 'none',
        whiteSpace: 'nowrap',
        '&:hover': {
            backgroundColor: colors.header
        },
        '&.active': {
            backgroundColor: colors.header,
            boxShadow: `0 3px 0 0 ${theme.palette.secondary.light}`,
            fontWeight: 'bold'
        }
    },
    hmsAppbarNavBtn: {
        margin: '0 1.5rem'
    },
    hmsDrawerListItemText: {
        '& a': {
            justifyContent: 'flex-start',
            minHeight: 0,
            textTransform: 'capitalize',
            color: 'inherit',
            '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none'
            }
        }
    },
    hmsDrawerUserContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
        width: '100%',
        color: '#fff',
        '& > .MuiBox-root:first-child': {
            height: '6rem',
            width: '6rem',
            fontSize: '2.5rem',
            '& img': {
                height: '6rem',
                width: '6rem'
            }
        }
    },
    hmsUserDPSize: {
        height: theme.spacing(12),
        width: theme.spacing(12),
        border: '1px solid #7986cb',
        '& > img': {
            marginLeft: 0
        }
    },
    hmsListItemIconSize: {
        minWidth: theme.spacing(4.5)
    },
    hmsNoBorderRadius: {
        '& .MuiPaper-root': {
            borderRadius: 0
        }
    },
    hmsDesktopAppbarNavItemBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: appBarMinHeight
    },
    hmsActiveDrawerLink: {
        color: theme.palette.primary.main
    },
    hmsUserDPName: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        color: '#262626',
        height: '1.875rem',
        width: '1.875rem',
        borderRadius: '50%',
        fontSize: '0.75rem',
        overflow: 'hidden',
        textTransform: 'uppercase',
        '&:hover': {
            backgroundColor: '#fff',
            color: '#262626'
        },
        '& img': {
            height: '1.875rem',
            width: '1.875rem'
        }
    },
    hmsDesktopUserTray: {
        '& .MuiPaper-root': {
            minWidth: '15rem'
        },
        '& .MuiTypography-root': {
            display: 'flex',
            flexDirection: 'column',
            '& > .MuiBox-root': {
                minHeight: '11.25rem',
                width: '100%',
                marginLeft: 0,
                color: '#000000de',
                '& > *:first-child': {
                    backgroundColor: '#a7bff5c9',
                    border: '1px solid #a7bff5c9'
                }
            }
        }
    },
    hmsDesktopUserNRContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        minHeight: '64px',
        padding: theme.spacing(0, 0, 0, 1.5),
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: colors.header
        }
    },
    mainAppBar: {
        alignItems: 'center',
        backgroundColor: colors.header,
        boxShadow: 'none',
        padding: theme.spacing(0, 2)
    },
    hmsHeaderBorderBottom: {
        borderBottom: `1px solid ${colors.white3}`
    },
    hmsToolbar: {
        width: '100%',
        padding: 0
    },
    hmsDesktopUserTrayHanger: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

let HmsHeader = props => {
    const classes = useStyles();
    const theme = useTheme();
    const currPathname = useLocation().pathname;
    const { appStore, setAppStore } = useContext(HmsContext);
    const { isLogin, userDetails, uiApiUtils } = appStore || {};
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openUserTray = Boolean(anchorEl);

    useEffect(() => {
        // Show the button only if the user is logged in
        if (Cookies.get('hms_acct')) {
            setIsLoggedIn(true);
        }
    });
    useEffect(() => {
        if (!isLogin) {
            getRightActiveTab();
        }
    }, [isLogin, currPathname]);

    const getRightActiveTab = () => {
        setActiveTab(
            currPathname === '/'
                ? 0
                : currPathname.includes('/about')
                ? 1
                : null
        );
    };
    const handleTabChange = e => {
        // Enable tab change only when user is logged in
        if (isLoggedIn) {
            setActiveTab(parseInt(e.currentTarget.tabIndex));
        }
        setIsDrawerOpen(false);
    };
    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const handleUserTrayMenuClick = e => {
        setAnchorEl(e.currentTarget);
    };
    const handleUserTrayClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        setAnchorEl(null);
        setIsDrawerOpen(false);
        setIsLoggedIn(false);
        // Reset the context level state
        setAppStore({ ...appStore, isLogin: true, userDetails: null });
        // Logout and destroy the existing session
        logoutAndRedirect(uiApiUtils, Cookies);
    };
    window.addEventListener('click', () => {
        getRightActiveTab();
    });
    window.addEventListener('resize', () => {
        setIsDrawerOpen(false);
    });
    const hmsLogoElm = (
        <Box className={classes.logoContainer}>
            <Tooltip title={hmsVersion} arrow>
                <a href="/" className={classes.hmsLogo}>
                    <Box className={classes.hmsBrandLogo} />
                    <Box className={classes.hmsBrandName}>
                        <Box component="span">MERN</Box>
                        <Box component="span">Starter</Box>
                    </Box>
                </a>
            </Tooltip>
            
        </Box>
    );
    const drawer = (
        <Box>
            <Box className={`${classes.toolbar} ${classes.toolbarTop}`}>
                {userDetails ? (
                    <Box
                        className={classes.hmsDrawerUserContainer}
                        title={userDetails && userDetails.name}
                    >
                        <Box
                            mb={2}
                            className={
                                !userDetails.dp ? classes.hmsUserDPName : ''
                            }
                        >
                            {userDetails.dp ? (
                                <Avatar
                                    alt="User"
                                    src={userDetails.dp || userMaleDP}
                                    className={classes.hmsUserDPSize}
                                />
                            ) : (
                                getDisplayName(userDetails.name)
                            )}
                        </Box>
                        <Box mb={1} fontSize="1rem">
                            {userDetails.name || ''}
                        </Box>
                        <Box mb={1} fontWeight="fontWeightLight">
                            {userDetails.email}
                        </Box>
                    </Box>
                ) : (
                    hmsLogoElm
                )}
            </Box>
            {userDetails ? (
                <Fragment>
                    <List>
                        <ListItem button>
                            <ListItemIcon
                                className={classes.hmsListItemIconSize}
                            >
                                <HomeIcon
                                    className={
                                        (activeTab === 0 &&
                                            classes.hmsActiveDrawerLink) ||
                                        ''
                                    }
                                />
                            </ListItemIcon>
                            <ListItemText
                                className={classes.hmsDrawerListItemText}
                            >
                                <Link
                                    to="/"
                                    alt="Menu"
                                    tabIndex="0"
                                    className={classes.hmsDesktopAppbarNavItem}
                                    onClick={handleTabChange}
                                >
                                    Home
                                </Link>
                            </ListItemText>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon
                                className={classes.hmsListItemIconSize}
                            >
                                <DashboardIcon
                                    className={
                                        (activeTab === 1 &&
                                            classes.hmsActiveDrawerLink) ||
                                        ''
                                    }
                                />
                            </ListItemIcon>
                            <ListItemText
                                className={classes.hmsDrawerListItemText}
                            >
                                <Link
                                    to="/my-form"
                                    alt="Menu"
                                    tabIndex="1"
                                    className={classes.hmsDesktopAppbarNavItem}
                                    onClick={handleTabChange}
                                >
                                    My Form
                                </Link>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button onClick={handleLogout}>
                            <ListItemIcon
                                className={classes.hmsListItemIconSize}
                            >
                                <ExitToAppIcon color="secondary" />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Fragment>
            ) : null}
        </Box>
    );
    const container =
        props.window !== undefined ? () => window().document.body : undefined;

    return (
        <header className={classes.root}>
            <AppBar
                position="fixed"
                className={`${classes.mainAppBar} ${
                    isLoggedIn ? classes.hmsHeaderBorderBottom : ''
                }`}
            >
                <Toolbar className={classes.hmsToolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    {hmsLogoElm}
                    {isLoggedIn ? (
                        <Fragment>
                            <Box
                                className={classes.hmsDesktopNavItemsContainer}
                            >
                                <Box
                                    className={`${classes.hmsDesktopAppbarNavItems} ${classes.hmsDesktopAppbarNavItemsLeft}`}
                                >
                                    <Box
                                        className={
                                            classes.hmsDesktopAppbarNavItemBox
                                        }
                                    >
                                        <Link
                                            to="/"
                                            alt="Menu"
                                            tabIndex="0"
                                            className={`${
                                                classes.hmsAppbarNavBtn
                                            } ${
                                                classes.hmsDesktopAppbarNavItem
                                            } ${
                                                (activeTab === 0 && 'active') ||
                                                ''
                                            }`}
                                            onClick={handleTabChange}
                                        >
                                            Home
                                        </Link>
                                    </Box>
                                    <Box
                                        className={
                                            classes.hmsDesktopAppbarNavItemBox
                                        }
                                    >
                                        <Link
                                            to="/my-form"
                                            alt="Menu"
                                            tabIndex="1"
                                            className={`${
                                                classes.hmsAppbarNavBtn
                                            } ${
                                                classes.hmsDesktopAppbarNavItem
                                            } ${
                                                (activeTab === 1 && 'active') ||
                                                ''
                                            }`}
                                            onClick={handleTabChange}
                                        >
                                            My-Form
                                        </Link>
                                    </Box>
                                </Box>
                                <Box
                                    className={`${classes.hmsDesktopAppbarNavItems} ${classes.hmsDesktopAppbarNavItemsRight}`}
                                >
                                    {userDetails && (
                                        <Box
                                            className={
                                                classes.hmsDesktopUserNRContainer
                                            }
                                        >
                                            <Box
                                                className={
                                                    classes.hmsDesktopUserTrayHanger
                                                }
                                                onClick={
                                                    handleUserTrayMenuClick
                                                }
                                            >
                                                <Tooltip
                                                    title={
                                                        userDetails &&
                                                        userDetails.name
                                                    }
                                                    arrow
                                                >
                                                    <IconButton
                                                        aria-label="account of current user"
                                                        aria-controls="menu-appbar"
                                                        aria-haspopup="true"
                                                        color="inherit"
                                                        className={
                                                            classes.hmsUserDPName
                                                        }
                                                    >
                                                        {userDetails.dp ? (
                                                            <img
                                                                src={userMaleDP}
                                                                alt="User DP"
                                                            />
                                                        ) : (
                                                            getDisplayName(
                                                                userDetails.name
                                                            )
                                                        )}
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                            <Menu
                                                id="menu-appbar"
                                                getContentAnchorEl={null}
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right'
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right'
                                                }}
                                                PaperProps={{
                                                    style: {
                                                        marginTop: '0.3125rem'
                                                    }
                                                }}
                                                open={openUserTray}
                                                className={`${classes.hmsNoBorderRadius} ${classes.hmsDesktopUserTray}`}
                                                onClose={handleUserTrayClose}
                                            >
                                                <MenuItem
                                                    onClick={
                                                        handleUserTrayClose
                                                    }
                                                >
                                                    <ListItemText
                                                        primary={
                                                            <Box
                                                                className={
                                                                    classes.hmsDrawerUserContainer
                                                                }
                                                                title={
                                                                    userDetails &&
                                                                    userDetails.name
                                                                }
                                                            >
                                                                <Box
                                                                    mb={2}
                                                                    className={
                                                                        !userDetails.dp
                                                                            ? classes.hmsUserDPName
                                                                            : ''
                                                                    }
                                                                >
                                                                    {userDetails.dp ? (
                                                                        <Avatar
                                                                            alt="User"
                                                                            src={
                                                                                userDetails.dp ||
                                                                                userMaleDP
                                                                            }
                                                                            className={
                                                                                classes.hmsUserDPSize
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        getDisplayName(
                                                                            userDetails.name
                                                                        )
                                                                    )}
                                                                </Box>
                                                                <Box
                                                                    mb={1}
                                                                    fontSize="1rem"
                                                                >
                                                                    {userDetails.name ||
                                                                        ''}
                                                                </Box>
                                                                <Box
                                                                    mb={1}
                                                                    fontWeight="fontWeightLight"
                                                                >
                                                                    {
                                                                        userDetails.email
                                                                    }
                                                                </Box>
                                                            </Box>
                                                        }
                                                    />
                                                </MenuItem>
                                                <Divider />
                                                <MenuItem
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon
                                                        className={
                                                            classes.hmsListItemIconSize
                                                        }
                                                    >
                                                        <ExitToAppIcon color="secondary" />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Logout" />
                                                </MenuItem>
                                            </Menu>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Fragment>
                    ) : null}
                </Toolbar>
            </AppBar>
            <nav
                className={classes.drawer}
                aria-label="HCL Software Innovation Labs nav links"
            >
                <Hidden mdUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={isDrawerOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </header>
    );
};

export default withRouter(HmsHeader);
