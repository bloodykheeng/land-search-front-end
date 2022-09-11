import React from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import styled from 'styled-components';

function AdminLabel({placeholder,style}){
  return (
    <AdminLabelDiv style={style}>
        <UploadFileIcon />
        {placeholder}
        </AdminLabelDiv>
  )
}

const AdminLabelDiv = styled.div`
-webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    border-radius:10px;
    padding:10px;
    max-width:500px;
    cursor:pointer;
    font-weight:500;
    margin:20px 0px 20px;
    &:hover{
        background-color:gold;
    }
`;
export default AdminLabel;