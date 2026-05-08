// import React from 'react'
import Cookies from "js-cookie"
import { Navigate, Outlet } from 'react-router-dom';
const AdminProtected = () => {
  
    const token = Cookies.get("token")
    const role = Cookies.get("role");

    const isAuthenticate = token && (role === "admin")

    return isAuthenticate ? <Outlet/> : <Navigate to="/login"/>
}

export default AdminProtected