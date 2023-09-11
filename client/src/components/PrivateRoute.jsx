// PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    currentUser ? (
      <Route {...rest} element={<Component />} />
    ) : (
      <Navigate to="/signin" />
    )
  );
}

export default PrivateRoute;
