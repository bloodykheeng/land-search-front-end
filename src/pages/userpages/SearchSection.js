import {useState} from "react";
import MySection from "../../components/main-components/Section";
import Ministrybar from "../../components/main-components/MinistryBar";
import styled from "styled-components";
import MyButton from "../../components/form-components/MyButton";
import MyNav from "../../components/main-components/MyNav";
import Lottie from "lottie-react";
import NoData from "../../lottiefiles/userlotties/nodata.json";
import FileLost from "../../lottiefiles/userlotties/filelost.json";

import Axios from "axios";
import UserTable from "./UserTable";
import {cldcolumn , ownercolumn, neighbourcolumn , witnesscolumn } from "./UserColumns";


function SearchSection(){
const [clinnumber, setclinnumber] = useState("");
const[isempty,setisempty] = useState(false);
const[showtable , setshowtable] = useState(false);
const [cld, setcld] = useState("");
const [owner, setowner] = useState("");
const [neighbour, setneighbour] = useState("");
const [witness, setwitness] = useState("");
const [nouser , setnouser] = useState(false);
const [showhometext, setshowhometext] = useState(true);

const [customaryclick , setcustomaryclick] = useState(false);
const [freeholdclick , setfreeholdclick] = useState(false);
const [Mailolandclick , setMailolandclick] = useState(false);
const [LeaseHoldclick , setLeaseHoldclick] = useState(false);



  const search = async ()=>{  
    if(!clinnumber){
        setisempty("please first enter a value");
    }else{
        setisempty(false)
        setshowhometext(false);
        
        const data = {
            clinnumber
        }

        console.log("The search clin number is : ", clinnumber);
        console.log("the data is ",data);
        
        try{
            let response = await Axios.post("/usersearch", data,{withCredentials : false});
            console.log(response.data);
            
            if(response.data.status === "successfull"){
                setshowhometext(false);
                setshowtable(true);
                setcld(response.data.cld);
                setneighbour(response.data.neighbour);
                setowner(response.data.owner);
                setwitness(response.data.witness);
            }else if(response.data.status === "user not found"){
                setshowhometext(false);
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
setshowhometext(true);
setnouser(false);
setshowtable(false);
setcld(null);
setisempty("please try another clin number");
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

                  {nouser && <div style={{height:"100%"}}>
                    <div style={{height:"30%"}}>
                    <h1>No record found attached to this clin number : {clinnumber}</h1>
                    <MyButton  placeholder="Back" onClick={handleback}/>
                    </div>
                    <div style={{height:"70%"}}>
                        <Lottie style={{height:"200px"}} animationData={FileLost} loop={true}/>
                    </div>
                  </div> }

                  


                    {showhometext && 
                    <>
                         <div className="home-text">
                        <strong>Hello ! You are Welcome</strong>
                            <h2><b>Land Search Information System</b></h2>
                            <p> You can easily perfom a search on your land by :<br/> first choosing your prefered tenure system ,<br/> Then entering in your clin number or <br /> entering in plot and block number where necessary </p>
                            
                        </div> 
                        <div className="row align-items-center search" >
                        <div className="contact-form" style={{display:"flex"}}>
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
                        
                        {customaryclick && <div className="row" style={{display : "flex",flexDirection : "column", justifyContent : "Center",alignItems : "center",paddingTop:"30px"}}>
    
                                    {isempty && <p style={{color:"red"}}>{isempty}</p>}
                                
                                    <div className="input-group" >
                                        
                                        <input style={{width:"100%"}} type="text" onChange={(e)=>setclinnumber(e.target.value)} placeholder="enter clin number" className="input-control" required />
                                    </div>
                                    <MyButton placeholder="search" onClick={search} />
                                    
                                </div>}
    
                                {freeholdclick && 
                                <div>
                                <strong style={{color:"green"}}>Free Hold Land Data not yet set</strong>
                                <Lottie style={{width:"60%"}} animationData={NoData} loop={true}/>
                                </div> }
                                {Mailolandclick &&
                                <div>
                                    <strong style={{color:"brown"}}>Mailo Land Data not yet set</strong>
                                    <Lottie style={{width:"60%"}} animationData={NoData} loop={true}/>
                                </div>
                                }
                                {LeaseHoldclick && 
                                <div>
                                    <strong style={{color:"red"}}>Lease Hold Data not yet set</strong>
                                    <Lottie style={{width:"60%"}} animationData={NoData} loop={true}/>
                                </div>
                                }
                       
                       </div>
                       
    
                            
                        </div>
                        
                      </div>
                    </>
                       
                    }
                  


                 
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