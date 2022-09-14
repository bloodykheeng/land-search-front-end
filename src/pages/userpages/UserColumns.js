let cldcolumn = [
    { field: 'Clin_Number', headerName: 'Clin_Number', minWidth: 150  },
    { field: 'Minute_Number', headerName: 'Minute_Number', minWidth: 350},
    { field: 'OwnershipType_Name', headerName: 'OwnershipType_Name', minWidth: 200  },
    { field: 'Cla_Name', headerName: 'Cla_Name', minWidth: 350  },
    { field: 'Cla_Certificate_Of_Incorporation_Number', headerName: 'Cla_Certificate_Of_Incorporation_Number', minWidth: 130  },
    { field: 'Name_Of_The_Community', headerName: 'Name_Of_The_Community', minWidth: 350  },
    { field: 'Region_Name', headerName: 'Region_Name', minWidth: 130  },
    { field: 'District_Name', headerName: 'District_Name', minWidth: 130  },
    { field: 'County_Name', headerName: 'County_Name', minWidth: 130  },
    { field: 'SubCounty_Name', headerName: 'SubCounty_Name', minWidth: 130  },
    { field: 'parish_Name', headerName: 'parish_Name', minWidth: 130  },
    { field: 'Village_Name', headerName: 'Village_Name', minWidth: 130 },
    { field: 'Plot_Number', headerName: 'Plot_Number', minWidth: 130 },
    { field: 'Perimeter_Poly_Km', headerName: 'Perimeter_Poly_Km', minWidth: 130  },
    { field: 'Area_Poly_Ha', headerName: 'Area_Poly_Ha', minWidth: 130  },
    { field: 'Comments', headerName: 'Comments', minWidth: 350  },
    { field: 'Land_Use', headerName: 'Land_Use', minWidth: 350  },
    { field: 'Easements_Or_Other_Persons_Rights', headerName: 'Easements_Or_Other_Persons_Rights', minWidth: 350  }

] ;

let ownercolumn = [
    { field: 'Surname', headerName: 'Surname', minWidth: 100 ,},
    { field: 'GivenName', headerName: 'GivenName', minWidth: 130 ,},
    { field: 'OtherNames', headerName: 'OtherNames', minWidth: 130 ,},
    { field: 'Gender_Type', headerName: 'Gender', minWidth: 130 ,},
    { field: 'TelNumber', headerName: 'TelNumber', minWidth: 130 ,},
    { field: 'Id_Nin_Number', headerName: 'Id_Nin_Number', minWidth: 250 ,},
    { field: 'Address_Name', headerName: 'Address_Name', minWidth: 130 ,}
];

let neighbourcolumn = [
    { field: 'Name_Of_Adjacent_Owner', headerName: 'Neighbours Name', minWidth: 500 ,flex:1}
];

let witnesscolumn = [
    { field: 'Name_Of_The_Witness', headerName: 'Name_Of_The_Witness', minWidth: 500 ,flex:1}
];

export {cldcolumn , ownercolumn, neighbourcolumn , witnesscolumn };