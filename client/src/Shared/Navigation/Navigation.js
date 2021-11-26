import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box,
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
    useTheme
} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Context/useAuth';

const Navigation = function () {
    const { user, logout } = useAuth();
    const theme = useTheme();
    const useStyle = makeStyles({
        navItem: {
            color: '#fff',
            textDecoration: 'none'
        },
        navBarItem: {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            textAlign: 'center'
        },
        navIcon: {
            [theme.breakpoints.up('sm')]: {
                display: 'none !important'
            }
        },
        navItemContainer: {
            [theme.breakpoints.down('sm')]: {
                display: 'none !important'
            }
        },
        navLogo: {
            textAlign: 'left',
            [theme.breakpoints.down('sm')]: {
                textAlign: 'right'
            }
        }
    });
    const { navItem, navIcon, navItemContainer, navLogo, navBarItem } = useStyle();
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            className={navIcon}
                            onClick={toggleDrawer('left', true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                            className={navLogo}
                        >
                            DreamVilla
                        </Typography>

                        <Box className={navItemContainer}>
                            <Link to="/explore" className={navItem}>
                                <Button color="inherit">Explore</Button>
                            </Link>
                            {user?.email ? (
                                <>
                                    <Link to="/dashboard" className={navItem}>
                                        <Button color="inherit">Dashboard</Button>
                                    </Link>
                                    <Button color="inherit" onClick={() => logout()}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <Link to="/login" className={navItem}>
                                    <Button color="inherit">Login</Button>
                                </Link>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
                <Box
                    role="presentation"
                    onClick={toggleDrawer('left', false)}
                    onKeyDown={toggleDrawer('left', false)}
                >
                    <List>
                        <Link to="/" className={navBarItem}>
                            <ListItem button>
                                <ListItemText primary="Home" sx={{ px: 4, textAlign: 'center' }} />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to="/explore" className={navBarItem}>
                            <ListItem button>
                                <ListItemText
                                    primary="Explore"
                                    sx={{ px: 4, textAlign: 'center' }}
                                />
                            </ListItem>
                        </Link>
                        <Divider />
                        {user?.email ? (
                            <>
                                <Link to="/dashboard" className={navBarItem}>
                                    <ListItem button>
                                        <ListItemText
                                            primary="Dashboard"
                                            sx={{ px: 4, textAlign: 'center' }}
                                        />
                                    </ListItem>
                                </Link>
                                <Divider />

                                <ListItem>
                                    <Button onClick={() => logout()}>
                                        <ListItemText
                                            primary="Log Out"
                                            sx={{ px: 4, textAlign: 'center' }}
                                        />
                                    </Button>
                                </ListItem>
                            </>
                        ) : (
                            <Link to="/login" className={navBarItem}>
                                <ListItemText primary="Login" sx={{ px: 4, textAlign: 'center' }} />
                            </Link>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navigation;
