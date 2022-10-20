import React from 'react'
import SideBar from './SideBar';
import AdminNavBar from './AdminNavBar';
import styled from 'styled-components';

const AdminContainer = ({children,activeTab}) => {
  return (
    <Container>
      <SideBar activeTab = {activeTab}/>
        <div className="homeContainer">
            <AdminNavBar/>
            <div className = "children">
            {children}
            </div>
        </div>
    </Container>
  )
}
const  Container = styled.div`
display: flex;
overflow:hidden;
width:100vw;
height:100vh;
background-color: #ffd8d8;
.homeContainer {
  overflow:hidden;
  flex: 6;
  div.children{
    overflow:scroll;
    display:flex;
    height:100%;
    width:100%;
    flex-wrap:wrap;
   
  }
}
`;
export default AdminContainer;