import {
    Alert,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Rating,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../Context/useAuth';

const AddReviews = function () {
    const [review, setReview] = useState({});
    const [value, setValue] = React.useState(2);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { authToken, user } = useAuth();
    const handleChange = (e) => {
        setSuccess(false);
        setError('');
        const field = e.target.name;
        const newData = { ...review, [field]: e.target.value, name: user.displayName };
        setReview(newData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch('https://damp-lake-82171.herokuapp.com/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify({ ...review, rating: value })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    console.log(data);
                    setReview({});
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
                            Add review
                        </Typography>
                        {isLoading && <CircularProgress />}
                        {error !== '' && <Alert severity="error">{error}</Alert>}
                        {success && <Alert severity="success">Review added successfully</Alert>}
                        <Typography component="legend">Rating</Typography>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        <form onSubmit={handleSubmit}>
                            <TextField
                                sx={{
                                    width: 1,
                                    m: 1
                                }}
                                label="Review"
                                type="text"
                                name="review"
                                onChange={handleChange}
                                required
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Add Review
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddReviews;
