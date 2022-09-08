import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {v4} from "uuid";

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  let cld = [
    { field: 'Clin_Number', headerName: 'Clin_Number', width: 100 },
    { field: 'Minute_Number', headerName: 'Minute_Number', width: 130 },
    { field: 'OwnershipType_Name', headerName: 'OwnershipType_Name', width: 130 },
    { field: 'Cla_Name', headerName: 'Cla_Name', width: 130 },
    { field: 'Cla_Certificate_Of_Incorporation_Number', headerName: 'Cla_Certificate_Of_Incorporation_Number', width: 130 },
    { field: 'Name_Of_The_Community', headerName: 'Name_Of_The_Community', width: 130 },
    { field: 'Region_Name', headerName: 'Region_Name', width: 130 },
    { field: 'District_Name', headerName: 'District_Name', width: 130 },
    { field: 'County_Name', headerName: 'County_Name', width: 130 },
    { field: 'SubCounty_Name', headerName: 'SubCounty_Name', width: 130 },
    { field: 'parish_Name', headerName: 'parish_Name', width: 130 },
    { field: 'Village_Name', headerName: 'Village_Name', width: 130 },
    { field: 'Plot_Number', headerName: 'Plot_Number', width: 130 },
    { field: 'Perimeter_Poly_Km', headerName: 'Perimeter_Poly_Km', width: 130 },
    { field: 'Area_Poly_Ha', headerName: 'Area_Poly_Ha', width: 130 },
    { field: 'Comments', headerName: 'Comments', width: 130 },
    { field: 'Land_Use', headerName: 'Land_Use', width: 130 },
    { field: 'Easements_Or_Other_Persons_Rights', headerName: 'Easements_Or_Other_Persons_Rights', width: 130 }

] ;

let rpt = [
    { field: 'Surname', headerName: 'Surname', width: 100 },
    { field: 'GivenName', headerName: 'GivenName', width: 130 },
    { field: 'OtherNames', headerName: 'OtherNames', width: 130 },
    { field: 'Gender_Type', headerName: 'Gender', width: 130 },
    { field: 'TelNumber', headerName: 'TelNumber', width: 130 },
    { field: 'Id_Nin_Number', headerName: 'Id_Nin_Number', width: 130 },
    { field: 'Address_Name', headerName: 'Address_Name', width: 130 }
];

let neighbour = [
    { field: 'Name_Of_Adjacent_Owner', headerName: 'Neighbours Name', width: 100 }
];

let witness = [
    { field: 'Name_Of_The_Witness', headerName: 'Name_Of_The_Witness', width: 100 }
];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

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
