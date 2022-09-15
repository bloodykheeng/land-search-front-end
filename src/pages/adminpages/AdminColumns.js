let cldcolumn = [
    { field: 'landsearchregistrar', headerName: 'landsearchregistrar', minWidth: 300 , resizable : true },
    { field: 'Clin_Number', headerName: 'Clin_Number', minWidth: 300 },
    { field: 'Object_Id', headerName: 'Object_Id', minWidth: 300 },
    { field: 'Global_Id', headerName: 'Global_Id', minWidth: 300 },
    { field: 'OwnershipType_Name', headerName: 'OwnershipType_Name', minWidth: 200 },
    { field: 'Cla_Name', headerName: 'Cla_Name', minWidth: 130 },
    { field: 'Cla_Certificate_Of_Incorporation_Number', headerName: 'Cla_Certificate_Of_Incorporation_Number', minWidth: 250 },
    { field: 'Name_Of_The_Community', headerName: 'Name_Of_The_Community', minWidth: 350 },
    { field: 'Region_Name', headerName: 'Region_Name', minWidth: 130 },
    { field: 'District_Name', headerName: 'District_Name', minWidth: 130 },
    { field: 'County_Name', headerName: 'County_Name', minWidth: 130 },
    { field: 'SubCounty_Name', headerName: 'SubCounty_Name', minWidth: 130 },
    { field: 'parish_Name', headerName: 'parish_Name', minWidth: 130 },
    { field: 'Village_Name', headerName: 'Village_Name', minWidth: 130 },
    { field: 'Plot_Number', headerName: 'Plot_Number', minWidth: 130 },
    { field: 'Perimeter_Poly_Km', headerName: 'Perimeter_Poly_Km', minWidth: 130 },
    { field: 'Area_Poly_Ha', headerName: 'Area_Poly_Ha', minWidth: 130 },
    { field: 'Land_Use', headerName: 'Land_Use', minWidth: 350  },
    { field: 'Easements_Or_Other_Persons_Rights', headerName: 'Easements_Or_Other_Persons_Rights', minWidth: 350  },
    { field: 'Value_Per_Acre', headerName: 'Value_Per_Acre', minWidth: 300 },
    { field: 'Year_Of_Evaluation', headerName: 'Year_Of_Evaluation', minWidth: 300 },
    { field: 'Comments', headerName: 'Comments', minWidth: 350  },
    { field: 'Date_of_the_Interview', headerName: 'Date_of_the_Interview', minWidth: 300 },
    { field: 'Interviewed_By', headerName: 'Interviewed_By', minWidth: 300 },
    { field: 'Status', headerName: 'Status of the Survey', minWidth: 300 },
    { field: 'Supervision_Notes', headerName: 'Supervision_Notes', minWidth: 300 },
    { field: 'Shape_Area', headerName: 'Shape_Area', minWidth: 300 },
    { field: 'Shape_Length', headerName: 'Shape_Length', minWidth: 300 },
    { field: 'CreationDate', headerName: 'CreationDate', minWidth: 300 },
    { field: 'Creator_Name', headerName: 'Creator_Name', minWidth: 300 },
    { field: 'EditDate', headerName: 'EditDate', minWidth: 300 },
    { field: 'Editor_Name', headerName: 'Editor_Name', minWidth: 300 },
    { field: 'Surveyed_Parish_Name', headerName: 'Surveyed_Parish_Name', minWidth: 300 },
    { field: 'Minute_Number', headerName: 'Minute_Number', minWidth: 400 },
    { field: 'Instrument_Number', headerName: 'Instrument_Number', minWidth: 300 },
    { field: 'Recorders_Name', headerName: 'Recorders_Name', minWidth: 300 },
    { field: 'regDateAndTime', headerName: 'regDateAndTime', minWidth: 300 },
    { field: 'Land_Search_RegDate', headerName: 'Land_Search_RegDate', minWidth: 500 ,type :"datetime" , valueGetter : ({value})=> value && new Date(value)},
    { field: 'ExcellFileName', headerName: 'ExcellFileName', minWidth: 500 },
    { field: 'GeoShapeFileName', headerName: 'GeoShapeFileName', minWidth: 500 }

] ;

let ownercolumn = [
    { field: 'username', headerName: 'landsearchregistrar', minWidth: 300 },
    { field: 'Object_Id', headerName: 'Object_Id', minWidth: 300 },
    { field: 'Global_Id', headerName: 'Global_Id', minWidth: 300 },
    { field: 'Surname', headerName: 'Surname', minWidth: 100 },
    { field: 'GivenName', headerName: 'GivenName', minWidth: 130 },
    { field: 'OtherNames', headerName: 'OtherNames', minWidth: 130 },
    { field: 'Gender_Type', headerName: 'Gender', minWidth: 130 },
    { field: 'Date_Of_Birth', headerName: 'Date_Of_Birth', minWidth: 130 },
    { field: 'MaritalStatus_Type', headerName: 'MaritalStatus_Type', minWidth: 130 },
    { field: 'Address_Name', headerName: 'Address_Name', minWidth: 130 },
    { field: 'TelNumber', headerName: 'TelNumber', minWidth: 130 },
    { field: 'Email', headerName: 'Email', minWidth: 130 },
    { field: 'Id_Nin_Number', headerName: 'Id_Nin_Number', minWidth: 250 },
    { field: 'Parent_Global_Id', headerName: 'Parent_Global_Id', minWidth: 300 },
    { field: 'CreationDate', headerName: 'CreationDate', minWidth: 300 },
    { field: 'Creator_Name', headerName: 'Creator_Name', minWidth: 300 },
    { field: 'EditDate', headerName: 'EditDate', minWidth: 300 },
    { field: 'Editor_Name', headerName: 'Editor_Name', minWidth: 300 },
    { field: 'Land_Search_RegDate', headerName: 'Land_Search_RegDate', minWidth: 500 ,type :"datetime" , valueGetter : ({value})=> value && new Date(value)},
    { field: 'ExcellFileName', headerName: 'ExcellFileName', minWidth: 500 },
    { field: 'GeoShapeFileName', headerName: 'GeoShapeFileName', minWidth: 500 }
    
];

let neighbourcolumn = [
    { field: 'username', headerName: 'landsearchregistrar', minWidth: 300 },
    { field: 'Object_Id', headerName: 'Object_Id', minWidth: 300 },
    { field: 'Global_Id', headerName: 'Global_Id', minWidth: 300 },
    { field: 'Name_Of_Adjacent_Owner', headerName: 'Neighbours Name', minWidth: 500 },
    { field: 'Parent_Global_Id', headerName: 'Parent_Global_Id', minWidth: 300 },
    { field: 'CreationDate', headerName: 'CreationDate', minWidth: 300 },
    { field: 'Creator_Name', headerName: 'Creator_Name', minWidth: 300 },
    { field: 'EditDate', headerName: 'EditDate', minWidth: 300 },
    { field: 'Editor_Name', headerName: 'Editor_Name', minWidth: 300 },
    { field: 'Land_Search_RegDate', headerName: 'Land_Search_RegDate', minWidth: 500 ,type :"datetime" , valueGetter : ({value})=> value && new Date(value) },
    { field: 'ExcellFileName', headerName: 'ExcellFileName', minWidth: 500 },
    { field: 'GeoShapeFileName', headerName: 'GeoShapeFileName', minWidth: 500 }
];

let witnesscolumn = [
    { field: 'username', headerName: 'landsearchregistrar', minWidth: 300 },
    { field: 'Object_Id', headerName: 'Object_Id', minWidth: 300 },
    { field: 'Global_Id', headerName: 'Global_Id', minWidth: 300 },
    { field: 'Name_Of_The_Witness', headerName: 'Name_Of_The_Witness', minWidth: 500 },
    { field: 'Parent_Global_Id', headerName: 'Parent_Global_Id', minWidth: 300 },
    { field: 'CreationDate', headerName: 'CreationDate', minWidth: 300 },
    { field: 'Creator_Name', headerName: 'Creator_Name', minWidth: 300 },
    { field: 'EditDate', headerName: 'EditDate', minWidth: 300 },
    { field: 'Editor_Name', headerName: 'Editor_Name', minWidth: 300 },
    { field: 'Land_Search_RegDate', headerName: 'Land_Search_RegDate', minWidth: 500 ,type :"datetime" , valueGetter : ({value})=> value && new Date(value) },
    { field: 'ExcellFileName', headerName: 'ExcellFileName', minWidth: 500 },
    { field: 'GeoShapeFileName', headerName: 'GeoShapeFileName', minWidth: 500 }
];

let inspectioncolumn = [
    { field: 'username', headerName: 'landsearchregistrar', minWidth: 300 },
    { field: 'Object_Id', headerName: 'Object_Id', minWidth: 300 },
    { field: 'Global_Id', headerName: 'Global_Id', minWidth: 300 },
    { field: 'Parent_Global_Id', headerName: 'Parent_Global_Id', minWidth: 300 },
    { field: 'CreationDate', headerName: 'CreationDate', minWidth: 300 },
    { field: 'Creator_Name', headerName: 'Creator_Name', minWidth: 300 },
    { field: 'EditDate', headerName: 'EditDate', minWidth: 300 },
    { field: 'Editor_Name', headerName: 'Editor_Name', minWidth: 300 },
    { field: 'Land_Search_RegDate', headerName: 'Land_Search_RegDate', minWidth: 500 ,type :"datetime" , valueGetter : ({value})=> value && new Date(value)},
    { field: 'ExcellFileName', headerName: 'ExcellFileName', minWidth: 500 },
    { field: 'GeoShapeFileName', headerName: 'GeoShapeFileName', minWidth: 500 }
];

let rptformcolumn = [
    { field: 'username', headerName: 'landsearchregistrar', minWidth: 300 },
    { field: 'Object_Id', headerName: 'Object_Id', minWidth: 300 },
    { field: 'Global_Id', headerName: 'Global_Id', minWidth: 300 },
    { field: 'Parent_Global_Id', headerName: 'Parent_Global_Id', minWidth: 300 },
    { field: 'CreationDate', headerName: 'CreationDate', minWidth: 300 },
    { field: 'Creator_Name', headerName: 'Creator_Name', minWidth: 300 },
    { field: 'EditDate', headerName: 'EditDate', minWidth: 300 },
    { field: 'Editor_Name', headerName: 'Editor_Name', minWidth: 300 },
    { field: 'Land_Search_RegDate', headerName: 'Land_Search_RegDate', minWidth: 500 ,type :"datetime" , valueGetter : ({value})=> value && new Date(value) },
    { field: 'ExcellFileName', headerName: 'ExcellFileName', minWidth: 500 },
    { field: 'GeoShapeFileName', headerName: 'GeoShapeFileName', minWidth: 500 }
];


export {
    cldcolumn,
    ownercolumn,
    neighbourcolumn,
    witnesscolumn, 
    inspectioncolumn,
    rptformcolumn};