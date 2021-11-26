import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import useProperties from '../../../hooks/useProperties';
import PropertyCard from '../PropertyCard/PropertyCard';

const Explore = function () {
    const { properties } = useProperties();
    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4">{properties.length} Properties Available</Typography>
            <Grid container spacing={2} sx={{ py: 4 }}>
                {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </Grid>
        </Container>
    );
};

export default Explore;
