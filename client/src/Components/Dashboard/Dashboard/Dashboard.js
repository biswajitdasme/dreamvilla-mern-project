import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../../Context/useAuth';

const drawerWidth = 240;

const Dashboard = function (props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const { admin, logout } = useAuth();
    const navigate = useNavigate();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {admin && (
                    <>
                        <ListItem button onClick={() => navigate('/dashboard')}>
                            <ListItemText primary="Manage Orders" />
                        </ListItem>
                        <ListItem button onClick={() => navigate('manageproperties')}>
                            <ListItemText primary="Manage Properties" />
                        </ListItem>
                        <ListItem button onClick={() => navigate('makeadmin')}>
                            <ListItemText primary="Make Admin" />
                        </ListItem>
                        <ListItem button onClick={() => navigate('addproperty')}>
                            <ListItemText primary="Add Property" />
                        </ListItem>
                    </>
                )}
                {admin || (
                    <>
                        <ListItem button onClick={() => navigate('/dashboard')}>
                            <ListItemText primary="My Orders" />
                        </ListItem>
                        <ListItem button onClick={() => navigate('payment')}>
                            <ListItemText primary="Payment" />
                        </ListItem>
                        <ListItem button onClick={() => navigate('addreviews')}>
                            <ListItemText primary="Add Reviews" />
                        </ListItem>
                    </>
                )}
                <ListItem button onClick={() => logout()}>
                    <ListItemText primary="Log Out" />
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    // window: PropTypes.func
};

export default Dashboard;
