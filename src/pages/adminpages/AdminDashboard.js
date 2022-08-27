import React , {useContext}from 'react'
import AdminContainer from '../../components/admin-components/AdminContainer';
import { isAdminData } from './AdminAuthContext';

export const AdminDashboard = () => {
    const {adminData } = useContext(isAdminData);
  return (
    <AdminContainer>
        <h1>Hello Mr {adminData.firstName} !</h1>
    </AdminContainer>
  )
}
export default AdminDashboard;
