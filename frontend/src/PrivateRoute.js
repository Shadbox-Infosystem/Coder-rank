import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Check if the user is authenticated
  
  return isAuthenticated ? Component : <Navigate to="/users/sign_in" />;
};

export default PrivateRoute;