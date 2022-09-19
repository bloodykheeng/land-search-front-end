import React from 'react';
import { DataGrid , GridActionsCellItem} from '@mui/x-data-grid';
import {v4} from "uuid";

const AdminTable = ({columns,rows ,idcolumn, ...otherprops}) => {
  return (
    <DataGrid
    getRowId={(row) => idcolumn ?  row[idcolumn] : v4()  }
    rows={rows}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    {...otherprops}
  />
  )
}

export default AdminTable