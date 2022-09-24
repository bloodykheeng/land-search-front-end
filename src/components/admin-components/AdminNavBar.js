import {useContext} from 'react';
import Button from '@mui/material/Button';
// import {Button} from "@mui/icons-material";
import styled from "styled-components";
import axios from 'axios';
import { isAdminAuth , isAdminData ,isAdminSession} from '../../pages/adminpages/AdminAuthContext';
import { ToastContainer, toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

const AdminNavBar = () => {
  const {setAdminSession} = useContext(isAdminSession);
const {setAdminAuth} = useContext(isAdminAuth);
const { adminData ,setAdminData} = useContext(isAdminData);
//const navigate = useNavigate();
    
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
    <NavBar>
    <div className="wrapper">
      <div className="title">
        <h2><strong>Ministry Of Lands Housing And Urban Planning</strong></h2>
      </div>
      <div className="items">
      <div className="item">
        <strong> {adminData.firstName} </strong>
        </div>
        <div style={{border : "1px solid rgba(255,255,255,0.40)"}} className="item">
          <img
            src="/images/coatOfArms.png"
            alt="emblem"
            className="avatar"
          />
        </div>
        <div className="item">
        <Button variant="contained" disableElevation={false}
        onClick={logouthandler}
        >
                 LogOut
         </Button>
        </div>
      </div>
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
  </NavBar>
  )
}
const NavBar = styled.div`
  background-color: #ffd8d8;
    height: 50px;
    border-bottom: 2px solid rgba(255,255,255,0.40);
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #555;
    margin:0;
  
    .wrapper {
      width: 100%;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
  
      .search {
        display: flex;
        align-items: center;
        border: 0.5px solid lightgray;
        padding: 3px;
  
        input {
          border: none;
          outline: none;
          background: transparent;
  
          &::placeholder {
            font-size: 12px;
          }
        }
      }
  
      .items {
        display: flex;
        align-items: center;
  
        .item {
          display: flex;
          align-items: center;
          margin-right: 20px;
          position: relative;
  
          .icon {
            font-size: 20px;
          }
  
          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
  
          .counter {
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: bold;
            position: absolute;
            top: -5px;
            right: -5px;
          }
        }
      }
    }
  
`;
export default AdminNavBar