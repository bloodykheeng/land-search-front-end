import { Link } from "react-router-dom";
import styled from "styled-components";
import {useContext} from 'react';
import axios from 'axios';
import { isAdminAuth , isAdminData } from '../../pages/adminpages/AdminAuthContext';
import { useNavigate } from 'react-router-dom';


import {
    Dashboard ,
    ExitToApp, 
    } from "@mui/icons-material";
    import CloudUploadIcon from '@mui/icons-material/CloudUpload';
    import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';

    


const SideBar = () => {

  const {setAdminAuth} = useContext(isAdminAuth);
  const { adminData ,setAdminData} = useContext(isAdminData);
  const navigate = useNavigate();
      
  const logouthandler = ()=>{
          axios.post("/logout").then((response)=>{
              setAdminAuth(response.data.auth);
              setAdminData(null);
              navigate("/adminlogin");
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
          <Link to="/admindashboard" style={{ textDecoration: "none" }}>
          <li>
            <Dashboard className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">SERVICES</p>
          <Link to="/adminupload" style={{ textDecoration: "none" }}>
            <li>
              <CloudUploadIcon className="icon" />
              <span>File Upload</span>
            </li>
          </Link>
          <Link to="/adminsearch" style={{ textDecoration: "none" }}>
            <li>
              <ScreenSearchDesktopIcon className="icon" />
              <span>Search</span>
            </li>
          </Link>
          
          <p className="title">LEAVE</p>
          <li onClick={logouthandler}>
            <ExitToApp className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      </AdminSideBar>
  )
}
const AdminSideBar = styled.div`

    flex: 1;
    border-right: 3px solid yellow;
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