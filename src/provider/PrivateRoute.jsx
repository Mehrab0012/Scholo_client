import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import Loader from '../components/Loader/Loader';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loader />;

  if (user && user?.email) return children;

  return <Navigate to="/authentication/logIn" state={{ from: location }} replace />;
};

export default PrivateRoute;