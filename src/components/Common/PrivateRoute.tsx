import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  //Check Login

  const isLogin = Boolean(localStorage.getItem('access_token'));

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};
