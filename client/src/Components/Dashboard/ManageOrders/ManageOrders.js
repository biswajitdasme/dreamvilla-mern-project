import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Context/useAuth';

const ManageOrders = function () {
    const [orders, setOrders] = useState([]);
    const { admin, user } = useAuth();

    useEffect(() => {
        let fetchURL = 'https://damp-lake-82171.herokuapp.com/orders';
        if (!admin) fetchURL += `/${user.email}`;
        fetch(fetchURL)
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, [admin, user]);

    const handleDelete = (id) => {
        const check = confirm('Are you sure ? ');
        if (check) {
            fetch(`https://damp-lake-82171.herokuapp.com/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.acknowledged) setOrders(orders.filter((order) => id !== order._id));
                });
        }
    };

    const handleApprove = (id) => {
        fetch(`https://damp-lake-82171.herokuapp.com/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(({ acknowledged }) => {
                if (acknowledged) {
                    const previosOrders = orders.filter((property) => property._id !== id);
                    const currentOrder = orders.find((property) => property._id === id);
                    currentOrder.shipped = true;
                    setOrders([...previosOrders, currentOrder]);
                }
            });
    };

    return (
        <Box
            sx={{
                px: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Typography variant="h4" sx={{ mb: 2 }}>
                Manage Orders
            </Typography>
            {/* <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 1 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Property ID</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((property) => (
                            <TableRow
                                key={property._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {property.propertyId}
                                </TableCell>
                                <TableCell align="center">{property.propertyAddress}</TableCell>
                                <TableCell align="center">${property.price}</TableCell>
                                {admin ? (
                                    <TableCell align="center">
                                        {property.shipped ? (
                                            'Shipped'
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleApprove(property._id)}
                                            >
                                                Approve
                                            </Button>
                                        )}
                                    </TableCell>
                                ) : (
                                    <TableCell align="center">
                                        {property.shipped ? 'Shipped' : 'Pending'}
                                    </TableCell>
                                )}
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        onClick={() => handleDelete(property._id)}
                                        sx={{ bgColor: 'red' }}
                                        color="error"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
            <Container>
                {orders.map((property) => (
                    <Grid container spacing={2} key={property._id}>
                        <Grid item xs={12} md={3}>
                            {property.propertyAddress}
                        </Grid>
                        <Grid item xs={12} md={3}>
                            ${property.price}
                        </Grid>
                        {admin ? (
                            <Grid item xs={12} md={3}>
                                {property.shipped ? (
                                    'Shipped'
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleApprove(property._id)}
                                    >
                                        Approve
                                    </Button>
                                )}
                            </Grid>
                        ) : (
                            <Grid item xs={12} md={3}>
                                {property.shipped ? 'Shipped' : 'Pending'}
                            </Grid>
                        )}
                        <Grid item xs={12} md={3}>
                            <Button
                                variant="contained"
                                onClick={() => handleDelete(property._id)}
                                sx={{ bgColor: 'red' }}
                                color="error"
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                ))}
            </Container>
        </Box>
    );
};

export default ManageOrders;
