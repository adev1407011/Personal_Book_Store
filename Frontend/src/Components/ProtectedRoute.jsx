import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/Authuprovider";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { authUser } = useAuth();  // Get the current user from context

  // Check if user is not logged in
  if (!authUser.user) {
    return <Navigate to="/login" replace />;  // Redirect to login if not logged in
  }

  // Check if the user's role does not match the required role
  if (requiredRole && authUser.role !== requiredRole) {
    return <Navigate to="/" replace />;  // Redirect to home if role does not match
  }

  return children;  // Render the child component if authenticated and role matches
};

export default ProtectedRoute;
