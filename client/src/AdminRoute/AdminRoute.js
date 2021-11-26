import { CircularProgress, Container } from '@mui/material';
import { Navigate } from 'react-router-dom';
import useAuth from '../Context/useAuth';

const AdminRoute = function ({ children }) {
    const { admin, isLoading } = useAuth();

    if (isLoading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (!admin) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default AdminRoute;
