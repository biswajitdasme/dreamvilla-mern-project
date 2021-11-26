import { CircularProgress, Container } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Context/useAuth';

const PrivateRoute = function ({ children }) {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (!user?.email) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
};

export default PrivateRoute;
