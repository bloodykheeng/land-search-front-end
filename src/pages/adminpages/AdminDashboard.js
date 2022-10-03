import React , {useContext}from 'react'
import AdminContainer from '../../components/admin-components/AdminContainer';
import { isAdminData  } from './AdminAuthContext';
import Lottie from "lottie-react";
import AdministrationData from "../../lottiefiles/adminlotties/Administrationlottie.json";

export const AdminDashboard = () => {
    const {adminData } = useContext(isAdminData);
    

  return (
    <AdminContainer>
      <div style={{display : "flex",alignItems:"center", padding:"20px"}}>
        <div style={{width:"50%"}}>
            <strong>Hello {adminData.firstName} !</strong>
            <p>You  can use this panel to Alter Data in this system</p>
            <p>Therefore You can easily route to different services through the sideNav Links</p>
        </div>
        <div style={{width:"50%"}}>
        <Lottie animationData={AdministrationData} loop={true} autoplay = {true} />
        </div>
      </div>
        
    
     
    </AdminContainer>
  )
}
export default AdminDashboard;
