import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React from 'react';
import useProperties from '../../../hooks/useProperties';

const ManageProperties = function () {
    const { properties, setProperties } = useProperties();

    const handleDelete = (id) => {
        const check = confirm('Are you sure ? ');
        if (check) {
            fetch(`https://damp-lake-82171.herokuapp.com/properties/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.acknowledged)
                        setProperties(properties.filter((property) => id !== property._id));
                });
        }
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
                Manage Properties
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 1 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Specification</TableCell>
                            <TableCell align="center">Address</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {properties.map((property) => (
                            <TableRow
                                key={property._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {property.specification}
                                </TableCell>
                                <TableCell align="center">{property.address}</TableCell>
                                <TableCell align="center">{property.price}</TableCell>
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
            </TableContainer>
        </Box>
    );
};

export default ManageProperties;
