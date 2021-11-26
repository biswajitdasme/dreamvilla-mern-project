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
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../../Context/useAuth';
// import authImage from '../../../images/login.png';

const Login = function () {
    const [loginData, setLoginData] = useState({});
    const { login, isLoading, authError, signInWithGoogle } = useAuth();
    const location = useLocation();
    const from = location.state ? location.state.from.pathname : '/';

    const handleChange = (e) => {
        const field = e.target.name;
        const newData = { ...loginData, [field]: e.target.value };
        setLoginData(newData);
    };
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        login(loginData.email, loginData.password, from);
        e.currentTarget.elements.email.value = '';
        e.currentTarget.elements.password.value = '';
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
                            Login
                        </Typography>
                        {isLoading && <CircularProgress />}
                        {authError && <Alert severity="error">Unable to login</Alert>}

                        <form onSubmit={handleLoginSubmit}>
                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Your Email"
                                name="email"
                                onChange={handleChange}
                                variant="standard"
                            />
                            <TextField
                                sx={{ width: 1, m: 1 }}
                                label="Your Password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                variant="standard"
                            />
                            <Button variant="contained" sx={{ width: 1, m: 1 }} type="submit">
                                Login
                            </Button>
                            <Link to="/register" style={{ textDecoration: 'none', m: 1 }}>
                                <Button variant="text">New User? Please Register</Button>
                            </Link>
                        </form>
                    </Paper>
                    <p> ======================= </p>
                    <Button variant="contained" onClick={() => signInWithGoogle(from)}>
                        Google Sign In
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
