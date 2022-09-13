import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {v4} from "uuid";


const UserTable = ({columns,rows}) => {
  return (
    <DataGrid
    getRowId={(row)=> v4()}
    rows={rows}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    checkboxSelection
  />
  )
}

export default UserTable;
