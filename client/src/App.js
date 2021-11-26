import { Container, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AdminRoute from './AdminRoute/AdminRoute';
import './App.css';
import AddProperty from './Components/Dashboard/AddProperty/AddProperty';
import AddReviews from './Components/Dashboard/AddReviews/AddReviews';
import Dashboard from './Components/Dashboard/Dashboard/Dashboard';
import MakeAdmin from './Components/Dashboard/MakeAdmin/MakeAdmin';
import ManageOrders from './Components/Dashboard/ManageOrders/ManageOrders';
import ManageProperties from './Components/Dashboard/ManageProperties/ManageProperties';
import Explore from './Components/Explore/Explore/Explore';
import Home from './Components/Home/Home/Home';
import HomeContents from './Components/Home/HomeContents/HomeContents';
import Login from './Components/Login/Login/Login';
import Register from './Components/Login/Register/Register';
import OrderProperty from './Components/OrderProperty/OrderProperty';
import AuthProvider from './Context/AuthProvider';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const App = function () {
    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />}>
                        <Route index element={<HomeContents />} />
                        <Route path="explore" element={<Explore />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route
                            path="orderproperty/:id"
                            element={
                                <PrivateRoute>
                                    <OrderProperty />
                                </PrivateRoute>
                            }
                        />
                    </Route>
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<ManageOrders />} />
                        <Route
                            path="payment"
                            element={
                                <Container sx={{ p: 4 }}>
                                    <Typography variant="h2">Payment system coming soon</Typography>
                                </Container>
                            }
                        />
                        <Route path="addreviews" element={<AddReviews />} />
                        <Route
                            path="manageproperties"
                            element={
                                <AdminRoute>
                                    <ManageProperties />
                                </AdminRoute>
                            }
                        />
                        <Route
                            path="addproperty"
                            element={
                                <AdminRoute>
                                    <AddProperty />
                                </AdminRoute>
                            }
                        />
                        <Route
                            path="makeadmin"
                            element={
                                <AdminRoute>
                                    <MakeAdmin />
                                </AdminRoute>
                            }
                        />
                    </Route>
                    <Route
                        path="*"
                        element={
                            <Container>
                                <Typography variant="h1">404</Typography>
                                <Typography variant="h4">Page Not Found</Typography>
                            </Container>
                        }
                    />
                </Routes>
            </AuthProvider>
        </div>
    );
};

export default App;
