import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../Context/useAuth';
import useProperties from '../../hooks/useProperties';

const OrderProperty = function () {
    const [orderData, setOrderData] = useState({});
    const { properties } = useProperties();
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const intendedProperty = properties.find((property) => property._id === id);

    const handleChange = (e) => {
        const field = e.target.name;
        const newData = { ...orderData, [field]: e.target.value };
        setOrderData(newData);
    };

    const handleOrder = (e) => {
        e.preventDefault();
        const purchase = {
            ...orderData,
            propertyId: intendedProperty._id,
            propertyAddress: intendedProperty.address,
            name: user.displayName,
            email: user.email,
            price: intendedProperty.price,
            shipped: false
        };
        console.log(purchase);
        fetch(`https://damp-lake-82171.herokuapp.com/property`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(purchase)
        })
            .then((res) => res.json())
            .then(({ acknowledged }) => {
                if (acknowledged) navigate('/dashboard');
            })
            .catch(({ message }) => console.log(message));
        e.target.reset();
    };

    return (
        <Container sx={{ py: 4 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h4" gutterBottom>
                            Enter Your Information
                        </Typography>

                        <form onSubmit={handleOrder}>
                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Your Name"
                                name="name"
                                defaultValue={user.displayName}
                                disabled
                                variant="standard"
                            />
                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Your Email"
                                name="email"
                                defaultValue={user.email}
                                disabled
                                variant="standard"
                            />
                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Your Phone"
                                name="phone"
                                type="phone"
                                required
                                onChange={handleChange}
                                variant="standard"
                            />
                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Your Address"
                                type="text"
                                name="address"
                                onChange={handleChange}
                                required
                                variant="standard"
                            />
                            <Button
                                variant="contained"
                                sx={{ width: 1, m: 1 }}
                                type="submit"
                                color="success"
                            >
                                Place Order
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h4" sx={{ pb: 2 }}>
                            {intendedProperty?.address}
                        </Typography>
                        <img
                            src={intendedProperty?.image}
                            alt={intendedProperty?.address}
                            sx={{ pb: 2 }}
                            style={{ width: '100%' }}
                        />
                        <Typography variant="h3" sx={{ pb: 2 }}>
                            ${intendedProperty?.price}
                        </Typography>
                        <Typography variant="body1" sx={{ pb: 4, textAlign: 'justify' }}>
                            {intendedProperty?.description}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OrderProperty;
