import { Link } from "react-router-dom";
import styled from "styled-components";
import {useContext,useState} from 'react';
import axios from 'axios';
import { isAdminAuth , isAdminData ,isAdminSession } from '../../pages/adminpages/AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


    import {Dashboard ,ExitToApp } from "@mui/icons-material";
    import CloudUploadIcon from '@mui/icons-material/CloudUpload';
    import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
    import DesignServicesIcon from '@mui/icons-material/DesignServices';
    import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

    


const SideBar = ({activeTab}) => {
  const {setAdminSession} = useContext(isAdminSession);
  const {setAdminAuth} = useContext(isAdminAuth);
  const {adminData,setAdminData} = useContext(isAdminData);
  const [active , setActive] = useState(activeTab);
  //const navigate = useNavigate();
  //console.log("admin account type:  ", adminData.accountTypeName);
  //setActive(activeTab);
  
  const logouthandler = ()=>{
          axios.post("/logout").then((response)=>{
              setAdminAuth(response.data.auth);
              setAdminData(null);
              setAdminSession("logged out");
              //navigate("/adminlogin");
          }).catch((err)=>{
            console.log(err);
            toast.error("Server Down");
          })
      }


  return (
    <AdminSideBar>
      <div className="top">
        <Link to="/admindashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Admin Panel</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admindashboard" 
          onClick={()=> setActive("dashboard")} 
          style={{ 
            textDecoration: "none"
          }}>
          <li style={{background: active === "dashboard" && "#ece8ff" }}>
            <Dashboard className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">SERVICES</p>
          <Link to="/adminupload" 
          onClick={()=> setActive("fileupload")}
          style={{ textDecoration: "none" }}>
            <li style={{background: active === "fileupload" && "#ece8ff" }}>
              <CloudUploadIcon className="icon" />
              <span>File Upload</span>
            </li>
          </Link>
          <Link to="/adminsearch" 
          onClick={()=> setActive("search")}
          style={{ textDecoration: "none" }}>
            <li style={{background: active === "search" && "#ece8ff" }}>
              <ScreenSearchDesktopIcon className="icon" />
              <span>Search</span>
            </li>
          </Link>

        {/* create admin */}
        {adminData.accountTypeName === "creator_admin" && <Link to="/adminsignup"
        onClick={()=> setActive("signup")}
         style={{ textDecoration: "none" }}>
            <li style={{background: active === "signup" && "#ece8ff" }}>
              <DesignServicesIcon className="icon" />
              <span>CreateAdmin</span>
            </li>
          </Link> }

          {/* viewadmin users */}
          
          <Link to="/adminusers" 
          onClick={()=> setActive("adminusers")}
          style={{ textDecoration: "none" }}>
            <li style={{background: active === "adminusers" && "#ece8ff" }}>
              <SupervisorAccountIcon className="icon" />
              <span>Administrators</span>
            </li>
          </Link>
       

          <p className="title">LEAVE</p>
          <li onClick={logouthandler}>
            <ExitToApp className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
      </AdminSideBar>
  )
}
const AdminSideBar = styled.div`

    flex: 1;
    border-right: 3px solid rgba(255,255,255,0.40);
    min-height: 100vh;
    background-color:#ffd8d8;
  
    .top {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
  
      .logo {
        font-size: 20px;
        font-weight: bold;
        color: #6439ff;
      }
    }
  
    hr {
      height: 0;
      border: 0.5px solid rgb(230, 227, 227);
    }
  
    .center {
      padding-left: 10px;
  
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
  
        .title {
          font-size: 10px;
          font-weight: bold;
          color: #999;
          margin-top: 15px;
          margin-bottom: 5px;
        }
  
        li {
          display: flex;
          align-items: center;
          padding: 5px;
          cursor: pointer;
  
          &:hover {
            background-color: #ece8ff;
          }
  
          .icon {
            font-size: 18px;
            color: #7451f8;
          }
  
          span{
              font-size: 13px;
              font-weight: 600;
              color: #888;
              margin-left: 10px;
          }
        }
      }
    }
  
    
    }
  
  
`;
export default SideBar;