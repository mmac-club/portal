// PrivateRoute.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return currentUser ? (
    <Routes>
      <Route {...rest} element={<Component />} />
    </Routes>
  ) : (
    <Navigate to="/signin" />
  );
}

export default PrivateRoute;
