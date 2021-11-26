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
import useAuth from '../../../Context/useAuth';

const MakeAdmin = function () {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { authToken } = useAuth();
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch('https://damp-lake-82171.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({
                email
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount || data.matchedCount) {
                    console.log(data);
                    setEmail('');
                    setSuccess(true);
                } else {
                    setError(data.error);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
        e.target.reset();
    };

    return (
        <Container
            sx={{
                minHeight: '600px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start'
            }}
        >
            <Grid container spacing={2} columns={{ xs: 12, md: 6 }}>
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={3}
                        sx={{
                            maxWidth: 1,
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography variant="h4" gutterBottom sx={{ width: 1, m: 1 }}>
                            Make Admin
                        </Typography>
                        {isLoading && <CircularProgress />}
                        {error !== '' && <Alert severity="error">{error}</Alert>}
                        {success && <Alert severity="success">Admin Created Successfully</Alert>}
                        <form onSubmit={handleAdminSubmit}>
                            <TextField
                                sx={{
                                    width: 1,
                                    m: 1
                                }}
                                label="Email"
                                type="email"
                                name="email"
                                onChange={handleChange}
                                required
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Make Admin
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MakeAdmin;
