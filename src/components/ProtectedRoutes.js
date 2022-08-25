import React, { useContext } from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { isAdminAuth } from './adminpages/adminAuthContext'

function ProtectedRoutes() {
    const {adminAuth} = useContext(isAdminAuth);
    console.log("protected route is auth : ",adminAuth)

    return adminAuth ? (<Outlet />) : <Navigate to="/" /> ;
}

export default ProtectedRoutes;