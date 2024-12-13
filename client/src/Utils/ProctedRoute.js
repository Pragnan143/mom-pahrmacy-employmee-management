import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
