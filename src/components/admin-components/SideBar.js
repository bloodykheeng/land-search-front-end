import {
    Dashboard ,
    PersonOutline,
    LocalShipping,
    CreditCard , 
    Store, 
    InsertChart,
    ExitToApp, 
    AccountCircleOutlined} from "@mui/icons-material";

import { Link } from "react-router-dom";
import styled from "styled-components";

const SideBar = () => {
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
          <li>
            <Dashboard className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">SERVICES</p>
          <Link to="/adminupload" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutline className="icon" />
              <span>File Upload</span>
            </li>
          </Link>
          <Link to="/admindashboard" style={{ textDecoration: "none" }}>
            <li>
              <Store className="icon" />
              <span>Tables</span>
            </li>
          </Link>
          <li>
            <CreditCard className="icon" />
            <span>test</span>
          </li>
          <li>
            <LocalShipping className="icon" />
            <span>test</span>
          </li>
          <p className="title">USEFUL</p>
          <li>
            <InsertChart className="icon" />
            <span>Stats</span>
          </li>
          
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlined className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToApp className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
        ></div>
        <div
          className="colorOption"
        ></div>
      </div>
      </AdminSideBar>
  )
}
const AdminSideBar = styled.div`

    flex: 1;
    border-right: 0.5px solid rgb(230, 227, 227);
    min-height: 100vh;
    background-color: white;
  
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
  
    .bottom{
        display: flex;
        align-items: center;
        margin: 10px;
  
        .colorOption{
            width: 20px;
            height: 20px;
            border-radius: 5px;
            border: 1px solid #7451f8;
            cursor: pointer;
            margin: 5px;
  
            &:nth-child(1){
                background-color: whitesmoke;
            }
            &:nth-child(2){
                background-color: #333;
            }
            &:nth-child(3){
                background-color: darkblue;
            }
        }
    }
  
  
`;
export default SideBar;