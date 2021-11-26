import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Footer = function () {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="body1" color="inherit">
                    &copy; DreamVilla, All rights resereved
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
