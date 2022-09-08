import {useState} from "react";
import MySection from "../../components/main-components/Section";
import Ministrybar from "../../components/main-components/MinistryBar";
import styled from "styled-components";
import MyButton from "../../components/form-components/MyButton";
import MyNav from "../../components/main-components/MyNav";
import Axios from "axios";
import UserTable from "./UserTable";
import { CenterFocusStrong } from "@mui/icons-material";

function SearchSection(){
const [clinnumber, setclinnumber] = useState("");
const[isempty,setisempty] = useState(false);
const[showtable , setshowtable] = useState(false);
const [cld, setcld] = useState("");
const [owner, setowner] = useState("");
const [neighbour, setneighbour] = useState("");
const [witness, setwitness] = useState("");
const [nouser , setnouser] = useState(false);
const [showhometext, setshowhometext] = useState("visible");

const [customaryclick , setcustomaryclick] = useState(false);
const [freeholdclick , setfreeholdclick] = useState(false);
const [Mailolandclick , setMailolandclick] = useState(false);
const [LeaseHoldclick , setLeaseHoldclick] = useState(false);

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

  const search = async ()=>{  
    if(!clinnumber){
        setisempty(true);
    }else{
        setshowhometext("hidden");
        
        const data = {
            clinnumber
        }

        console.log("The search clin number is : ", clinnumber);
        console.log("the data is ",data);
        
        try{
            let response = await Axios.post("/usersearch", data,{withCredentials : false});
            console.log(response.data);
            
            if(response.data.status === "successfull"){
            setshowtable(true);
            setcld(response.data.cld);
            setneighbour(response.data.neighbour);
            setowner(response.data.owner);
            setwitness(response.data.witness);
            }else if(response.data.status === "user not found"){
                setnouser(true);
            }
            
            
        }catch(err){
            console.log(err);
        }
       
    }

    console.log("search button pressed");
   
}

const handleback = ()=>{
setshowtable(false);
setshowhometext("visible");
setnouser(false);
setshowtable(false);
setcld(null);
setneighbour(null);
setowner(null);
setwitness(null);
setclinnumber(null);
}
return(
            <MySection>
              <MyNav />
              <SearchSectionDiv className="row align-items-center">
                <Ministrybar /> 

                {showtable &&
                  <div >
                    <div style={{marginBottom:"20px",marginTop:"20px"}}>
                        <MyButton  placeholder="Back" onClick={handleback}/>
                    </div>
                    <div style={{height:"200px",marginBottom:"20px"}}>
                        <h2>Land Demarcation Table</h2>
                        <UserTable columns={cldcolumn} rows={cld} />
                    </div><br />
                    <div style={{height:"400px",marginBottom:"20px"}}>
                        <h2>Land Owner Table</h2>
                        <UserTable columns={ownercolumn} rows={owner} />
                    </div><br />
                    <div style={{height:"400px",marginBottom:"20px"}}>
                        <h2>Neighbours Table</h2>
                        <UserTable columns={neighbourcolumn} rows={neighbour} />
                    </div><br />
                    <div style={{height:"400px",marginBottom:"20px"}}>
                        <h2>witness Table</h2>
                        <UserTable columns={witnesscolumn} rows={witness} />
                    </div><br />
                  </div>
                  }

                  {nouser && <div>
                    <h1>No record found attached to this clin number : {clinnumber}</h1>
                    <MyButton  placeholder="Back" onClick={handleback}/>
                  </div> }
                  <div className="home-text" style={{visibility : showhometext}}>
                  <h4>Hello ! You are Welcome</h4>
                      <h2><b>Land Search Information System</b></h2>
                      <p> You can easily perfom a search on your land by <br/> entering in your clin number for customary land <br /> entering plot and plot number for mailo land </p>
                      
                  </div>
                  <div className="row align-items-center search" style={{visibility:showhometext}}>
                    <div className="contact-form" style={{visibility:showhometext,display:"flex"}}>
                   <div style={{width:"50%"}}>
                    <MyButton placeholder="customary" style={{margin:"10px"}} onClick={()=>{
                        setcustomaryclick(true);
                        setfreeholdclick(false);
                        setMailolandclick(false);
                        setLeaseHoldclick(false);
                    }} />
                    <MyButton placeholder="free hold" style={{margin:"10px"}} onClick={()=>{
                        setfreeholdclick(true);
                        setcustomaryclick(false);
                        setMailolandclick(false);
                        setLeaseHoldclick(false);
                        }}/>
                    <MyButton placeholder="Mailo land" style={{margin:"10px"}} onClick={()=>{
                        setcustomaryclick(false);
                        setfreeholdclick(false);
                        setMailolandclick(true);
                        setLeaseHoldclick(false);

                        }}/>
                    <MyButton placeholder="Lease Hold" style={{margin:"10px"}} onClick={()=>{
                        setcustomaryclick(false);
                        setfreeholdclick(false);
                        setMailolandclick(false);
                        setLeaseHoldclick(true);
                        }}/>
                   </div>
                   <div style={{display : "flex",flexDirection : "column", justifyContent : "Center",alignItems : "center"}}>
                    {customaryclick && <div className="row" style={{visibility:showhometext,display : "flex",flexDirection : "column", justifyContent : "Center",alignItems : "center",paddingTop:"30px"}}>

                                {isempty && <p style={{color:"red"}}>please first enter a value</p>}
                            
                                <div className="input-group" >
                                    
                                    <input style={{width:"100%"}} type="text" onChange={(e)=>setclinnumber(e.target.value)} placeholder="enter clin number" className="input-control" required />
                                </div>
                                <MyButton placeholder="search" onClick={search} />
                                
                            </div>}

                            {freeholdclick && <strong>Free Hold Data not yet set</strong>}
                            {Mailolandclick && <strong>Mailo Land Data not yet set</strong>}
                            {LeaseHoldclick && <strong>Lease Hold Data not yet set</strong>}
                   
                   </div>
                   

                        
                    </div>
                    
                  </div>
                 
                  </SearchSectionDiv>
                  </MySection>
);
}

const SearchSectionDiv = styled.div`
display:flex;
flex-wrap:wrap;
.home-text, .search{
  width : 50%;
  padding:15px;
  }
  .contact-form{
      width:100%;
      height:100%;
      padding:0 15px;
      border-left: 1px dotted var(--white-alpha-40);
  }
  .contact-form .row{
      align-items:center;
      
  }
  .contact-form .input-group{
      width:100%;
      margin-bottom:30px;
  }
  .contact-form .input-control::placeholder{
      color:var(--black-dark);
      opacity:0.8;
      font-weight:300;
  }
  .contact-form .input-control{
      display:block;
      width:100%;
      height:50px;
      border-radius:25px;
      border:none;
      font-family:inherit;
      font-weight:400;
      font-size:16px;
      background-color:var(--white-alpha-25);
      padding:0 20px;
      color:var(--blue-dark);
      border:1px solid transparent;
      transition:border-color 0.3s ease;
  }
  .contact-form .input-control:focus{
      border-color:var(--white-alpha-40);
  }
`;
export default SearchSection;