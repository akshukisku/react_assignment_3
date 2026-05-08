// import React from 'react'
import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom';
const UserProtected = () => {
    
    const token = Cookies.get("token");
    const role = Cookies.get("role")

    const isAuthentication = token && (role === "user")

  return isAuthentication ? <Outlet/> : <Navigate to="/login" />
}

export default UserProtected