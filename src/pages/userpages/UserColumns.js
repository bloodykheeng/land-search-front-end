let cldcolumn = [
    { field: 'Clin_Number', headerName: 'Clin_Number', width: 150 },
    { field: 'Minute_Number', headerName: 'Minute_Number', width: 350 },
    { field: 'OwnershipType_Name', headerName: 'OwnershipType_Name', width: 130 },
    { field: 'Cla_Name', headerName: 'Cla_Name', width: 130 },
    { field: 'Cla_Certificate_Of_Incorporation_Number', headerName: 'Cla_Certificate_Of_Incorporation_Number', width: 130 },
    { field: 'Name_Of_The_Community', headerName: 'Name_Of_The_Community', width: 350 },
    { field: 'Region_Name', headerName: 'Region_Name', width: 130 },
    { field: 'District_Name', headerName: 'District_Name', width: 130 },
    { field: 'County_Name', headerName: 'County_Name', width: 130 },
    { field: 'SubCounty_Name', headerName: 'SubCounty_Name', width: 130 },
    { field: 'parish_Name', headerName: 'parish_Name', width: 130 },
    { field: 'Village_Name', headerName: 'Village_Name', width: 130 },
    { field: 'Plot_Number', headerName: 'Plot_Number', width: 130 },
    { field: 'Perimeter_Poly_Km', headerName: 'Perimeter_Poly_Km', width: 130 },
    { field: 'Area_Poly_Ha', headerName: 'Area_Poly_Ha', width: 130 },
    { field: 'Comments', headerName: 'Comments', width: 350  },
    { field: 'Land_Use', headerName: 'Land_Use', width: 350  },
    { field: 'Easements_Or_Other_Persons_Rights', headerName: 'Easements_Or_Other_Persons_Rights', width: 350  }

] ;

let ownercolumn = [
    { field: 'Surname', headerName: 'Surname', width: 100 },
    { field: 'GivenName', headerName: 'GivenName', width: 130 },
    { field: 'OtherNames', headerName: 'OtherNames', width: 130 },
    { field: 'Gender_Type', headerName: 'Gender', width: 130 },
    { field: 'TelNumber', headerName: 'TelNumber', width: 130 },
    { field: 'Id_Nin_Number', headerName: 'Id_Nin_Number', width: 250 },
    { field: 'Address_Name', headerName: 'Address_Name', width: 130 }
];

let neighbourcolumn = [
    { field: 'Name_Of_Adjacent_Owner', headerName: 'Neighbours Name', width: 500 }
];

let witnesscolumn = [
    { field: 'Name_Of_The_Witness', headerName: 'Name_Of_The_Witness', width: 500 }
];

export {cldcolumn , ownercolumn, neighbourcolumn , witnesscolumn };