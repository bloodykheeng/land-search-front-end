import React from 'react'
import styled from 'styled-components'

const AdminButton = ({placeholder,style}) => {
  return (
    <AdminButtonDiv style={style}>{placeholder}</AdminButtonDiv>
  )
}
const AdminButtonDiv = styled.div`
-webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    border-radius:10px;
    padding:10px;
    max-width:500px;
    cursor:pointer;
    font-weight:500;
    &:hover{
        background-color:gold;
    }
`;
export default AdminButton