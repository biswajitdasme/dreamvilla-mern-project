import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../../../Shared/Navigation/Navigation';
import Footer from '../Footer/Footer';

const Home = function () {
    return (
        <Container>
            <Navigation />
            <Outlet />
            <Footer />
        </Container>
    );
};

export default Home;
