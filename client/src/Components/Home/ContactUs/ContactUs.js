import {
    Alert,
    Button,
    CircularProgress,
    Container,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';

const ContactUs = function () {
    const [contactData, setContactData] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setSuccess(false);
        const field = e.target.name;
        const newData = { ...contactData, [field]: e.target.value };
        setContactData(newData);
    };
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch('https://damp-lake-82171.herokuapp.com/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        })
            .then((res) => res.json())
            .then((data) => {
                setSuccess(data.acknowledged);
            })
            .finally(() => setLoading(false));
        e.target.reset();
    };
    return (
        <Container sx={{ my: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ maxWidth: 1, p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Contact Us
                </Typography>
                {loading && <CircularProgress />}
                {success && <Alert severity="success">Message sent successfully</Alert>}
                <form onSubmit={handleLoginSubmit}>
                    <TextField
                        sx={{ width: 1, m: 1 }}
                        label="Your Email"
                        name="email"
                        onChange={handleChange}
                        variant="standard"
                        required
                    />
                    <TextField
                        sx={{ width: 1, m: 1 }}
                        label="Your Message"
                        type="text"
                        name="message"
                        onChange={handleChange}
                        variant="standard"
                        required
                    />
                    <Button variant="contained" sx={{ width: 1, m: 1 }} type="submit">
                        Send
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default ContactUs;
