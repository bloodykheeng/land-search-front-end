
let normal_admin_column = [
    { field: 'firstName', headerName: 'firstName', minWidth: 300 },
    { field: 'lastName', headerName: 'lastName', minWidth: 300 },
    { field: 'username', headerName: 'username', minWidth: 300 },
    { field: 'email', headerName: 'email', minWidth: 300 },
    { field: 'dateOfBirth', headerName: 'dateOfBirth', minWidth: 400 ,valueGetter : ({value})=> value && new Date(value) },
    { field: 'phoneNumber', headerName: 'phoneNumber', minWidth: 200 },
    { field: 'AccountTypeName', headerName: 'AccountTypeName', minWidth: 130 },
    { field: 'statusName', headerName: 'statusName', minWidth: 130 }, 
    
];


export {
    normal_admin_column,
    };