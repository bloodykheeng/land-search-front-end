import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAdminAuth } from "./pages/adminpages/AdminAuthContext";

function ProtectedRoutes() {
  const { adminAuth } = useContext(isAdminAuth);
  console.log("protected route is auth : ", adminAuth);

  return adminAuth ? <Outlet /> : <Navigate to="/adminlogin" />;
}

export default ProtectedRoutes;
