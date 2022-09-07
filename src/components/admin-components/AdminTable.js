import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const AdminTable = ({columns,rows}) => {
  return (
    <DataGrid
    rows={rows}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    checkboxSelection
  />
  )
}

export default AdminTable