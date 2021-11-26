import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PropertyCard = function ({ property: { _id, image, price, address } }) {
    const navigate = useNavigate();
    return (
        <Grid item xs={12} md={4}>
            <Card>
                <CardActionArea>
                    <CardMedia component="img" height="350" image={image} alt={address} />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            ${price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {address}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => navigate(`/orderproperty/${_id}`)}
                    >
                        Order
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default PropertyCard;
