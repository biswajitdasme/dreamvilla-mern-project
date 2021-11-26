import { Container, Grid, Paper, Rating, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Reviews = function () {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://damp-lake-82171.herokuapp.com/reviews')
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    return (
        <Container sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ pb: 2 }}>
                User Reviews
            </Typography>
            <Grid container spacing={2}>
                {reviews.map((review) => (
                    <Grid key={review._id} item xs={12} md={6}>
                        <Paper elevation={3} sx={{ py: 2, texAlign: 'center' }}>
                            <Typography variant="h6" sx={{ pb: 1 }}>
                                {review.name}
                            </Typography>
                            <Typography variant="body1" sx={{ pb: 1 }}>
                                {review.review}
                            </Typography>
                            <Rating
                                name="read-only"
                                value={review.rating}
                                readOnly
                                sx={{ pb: 1 }}
                            />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Reviews;
