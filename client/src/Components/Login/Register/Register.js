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
import { Link } from 'react-router-dom';
import useAuth from '../../../Context/useAuth';

const Register = function () {
    const [loginData, setLoginData] = useState({});
    const { user, registerUser, isLoading, authError } = useAuth();

    const handleOnBlur = (e) => {
        const field = e.target.name;
        const newData = { ...loginData, [field]: e.target.value };
        setLoginData(newData);
    };
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (loginData.password !== loginData.password2) {
            alert('Passwords do not match');
            return;
        }

        registerUser(loginData.email, loginData.password, loginData.name, '/');
        e.currentTarget.elements.name.value = '';
        e.currentTarget.elements.email.value = '';
        e.currentTarget.elements.password.value = '';
        e.currentTarget.elements.password2.value = '';
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
                            Register
                        </Typography>
                        {isLoading && <CircularProgress />}
                        {user?.email && <Alert severity="success">User Created Successfully</Alert>}
                        {authError && <Alert severity="error">Error creating account</Alert>}

                        <form onSubmit={handleLoginSubmit}>
                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Your Name"
                                name="name"
                                onBlur={handleOnBlur}
                                variant="standard"
                            />
                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Your Email"
                                type="email"
                                name="email"
                                onBlur={handleOnBlur}
                                variant="standard"
                            />
                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Your Password"
                                type="password"
                                name="password"
                                onBlur={handleOnBlur}
                                variant="standard"
                            />
                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Retype Password"
                                type="password"
                                name="password2"
                                onBlur={handleOnBlur}
                                variant="standard"
                            />
                            <Button variant="contained" sx={{ width: 1, m: 1 }} type="submit">
                                Register
                            </Button>
                            <Link to="/login" style={{ textDecoration: 'none', m: 1 }}>
                                <Button variant="text">Alreay Have Account? Login</Button>
                            </Link>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;
