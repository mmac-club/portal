// PrivateRoute.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../services/AuthService/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  console.log(currentUser)
  return currentUser ? (
    <Routes>
      <Route {...rest} element={<Component />} />
    </Routes>
  ) : (
    <Navigate to="/signin" />
  );
}

export default PrivateRoute;
