import React from 'react'
import SideBar from './SideBar';
import AdminNavBar from './AdminNavBar';
import styled from 'styled-components';

const AdminContainer = ({children}) => {
  return (
    <Container>
      <SideBar />
        <div className="homeContainer">
            <AdminNavBar/>
            {children}
        </div>
    </Container>
  )
}
const  Container = styled.div`
    display: flex;
    .homeContainer {
      flex: 6;
    }
`;
export default AdminContainer;