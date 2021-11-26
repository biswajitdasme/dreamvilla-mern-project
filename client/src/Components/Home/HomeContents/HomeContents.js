import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import useProperties from '../../../hooks/useProperties';
import PropertyCard from '../../Explore/PropertyCard/PropertyCard';
import ContactUs from '../ContactUs/ContactUs';
import HomeSlider from '../HomeSlider/HomeSlider';
import Reviews from '../Reviews/Reviews';

const HomeContents = function () {
    const { properties } = useProperties();

    return (
        <>
            <HomeSlider />
            <Container sx={{ py: 4 }}>
                <Typography variant="h4">Featured Properties</Typography>
                <Grid container spacing={2} sx={{ py: 4 }}>
                    {properties.slice(0, 6).map((property) => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </Grid>
            </Container>
            <Reviews />
            <ContactUs />
        </>
    );
};

export default HomeContents;
