import {
    Alert,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import useProperties from '../../../hooks/useProperties';

const AddProduct = function () {
    const [property, setProperty] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [acknowledged, setAcknowledged] = useState(false);
    const { addProperty } = useProperties();

    const handleChange = (e) => {
        setAcknowledged(false);
        const field = e.target.name;
        const newData = { ...property, [field]: e.target.value };
        setProperty(newData);
    };
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        addProperty(property, setAcknowledged, setError, setIsLoading, e);
    };
    return (
        <Container
            sx={{
                minHeight: '600px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Grid container spacing={2} columns={{ xs: 12, md: 6 }}>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Paper elevation={3} sx={{ maxWidth: 1, p: 2 }}>
                        <Typography variant="h4" gutterBottom>
                            Add Property
                        </Typography>
                        {isLoading && <CircularProgress />}
                        {error && <Alert severity="error">Unable to add product. Try again</Alert>}
                        {acknowledged && (
                            <Alert severity="success">Added Property Successfully</Alert>
                        )}

                        <form onSubmit={handleLoginSubmit}>
                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Specification"
                                name="specification"
                                type="text"
                                placeholder="4 bed, 3 bath, 2326sqft"
                                onChange={handleChange}
                                variant="standard"
                                required
                            />

                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Price"
                                name="price"
                                type="text"
                                placeholder="297900"
                                onChange={handleChange}
                                variant="standard"
                                required
                            />

                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Address"
                                name="address"
                                type="text"
                                placeholder="7427 Photon Walk, San Antonio, TX 78252"
                                onChange={handleChange}
                                variant="standard"
                                required
                            />

                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Image"
                                name="image"
                                type="text"
                                placeholder="http://imgbb.com/property.jpg"
                                onChange={handleChange}
                                variant="standard"
                                required
                            />
                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Description"
                                name="description"
                                type="text"
                                placeholder="Property Description"
                                onChange={handleChange}
                                variant="standard"
                                required
                            />

                            <Button variant="contained" sx={{ width: 1, m: 1 }} type="submit">
                                Add Property
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddProduct;
