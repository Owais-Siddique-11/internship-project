import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
