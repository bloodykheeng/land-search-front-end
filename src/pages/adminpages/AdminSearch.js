import React, { useState,useContext } from 'react'
import AdminContainer from '../../components/admin-components/AdminContainer';
import AdminSearchBar from '../../components/admin-components/AdminSearchBar';
import AdminTable from '../../components/admin-components/AdminTable';
import MyButton from '../../components/form-components/MyButton';

import {
    cldcolumn, ownercolumn, neighbourcolumn, witnesscolumn, inspectioncolumn, rptformcolumn} from './AdminColumns';

import Axios from "axios";

import { isAdminData ,isAdminAuth } from './AdminAuthContext';

function AdminSearch(){
    const {setAdminAuth} = useContext(isAdminAuth);

    const [errors , seterrors] = useState();
    const [clinnumber , setclinnumber] = useState();

    const[showtable , setshowtable] = useState(false);
    const [cld, setcld] = useState("");
    const [owner, setowner] = useState("");
    const [neighbour, setneighbour] = useState("");
    const [witness, setwitness] = useState("");
    const [inspection, setinspection] = useState("");
    const [rptform, setrptform] = useState("");
    const [nouser , setnouser] = useState(false);
    const [showsearch , setshowsearch] = useState(true);


    const click = async ()=>{
        if(!clinnumber){
            seterrors("first enter a clin number");
        }else{
            seterrors();
            const data = {
                clinnumber
            }
            //bellow we call our adminsearch api from the backend to fetch data from the database
              try{
                let res = await Axios.post("/adminsearch", data,{withCredentials : false});
                console.log(res.data);
                
                if(res.data.status === "cookie-failed"){
                    console.log(res.data.auth);
                    setAdminAuth(res.data.auth)
                }else if(res.data.status === "token-failed"){
                    console.log(res.data.message)
                    setAdminAuth(res.data.auth)
                }else if(res.data.status === "successfull"){
                    setshowtable(true);
                    setshowsearch(false)
                    setnouser(false)
                    setcld(res.data.cld);
                    setneighbour(res.data.neighbour);
                    setowner(res.data.owner);
                    setwitness(res.data.witness);
                    setinspection(res.data.inspection);
                    setrptform(res.data.rptform);
                    }else if(res.data.status === "user not found"){
                        setshowtable(false);
                        setshowsearch(false);
                        setnouser(true);
                        console.log("user not found if")
                    }
                else{
                    console.log("we have nothing to do for that click number contact administrator");

                }    
                
            }catch(err){
                console.log(err);
            }
        }   
        console.log("admin search button clicked");
    }


    const handleback = ()=>{
        setshowtable(false);
        setnouser(false);
        setshowsearch(true);
        setclinnumber(null);
        seterrors("try another clin number");
        setcld(null);
        setneighbour(null);
        setowner(null);
        setwitness(null);
        setinspection(null);
        setrptform(null);
        }
  

  return (
    <AdminContainer>
        {showsearch && <AdminSearchBar click={click} onChange={(e)=>{ setclinnumber(e.target.value)}} errors={errors}/> }
    {console.log("nouser : ",nouser)}
        {nouser && 
                    <div style={{display:"flex", justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"20px"}}>
                    <h1>No record found attached to this clin number : {clinnumber}</h1>
                    <MyButton  placeholder="Back" onClick={handleback}/>
                    </div>
         }

            {showtable &&
                  <div style={{width:"100%",padding:"20px"}}>
                    <div style={{marginBottom:"20px",marginTop:"20px"}}>
                        <MyButton  placeholder="Back" onClick={handleback}/>
                    </div>
                    <div style={{height:"200px",marginBottom:"20px"}}>
                        <h2>Land Demarcation Table</h2>
                        <AdminTable columns={cldcolumn} rows={cld} />
                    </div><br />
                    <div style={{height:"400px",marginBottom:"20px"}}>
                        <h2>Land Owner Table</h2>
                        <AdminTable columns={ownercolumn} rows={owner} />
                    </div><br />
                    <div style={{height:"400px",marginBottom:"20px"}}>
                        <h2>Neighbours Table</h2>
                        <AdminTable columns={neighbourcolumn} rows={neighbour} />
                    </div><br />
                    <div style={{height:"400px",marginBottom:"20px"}}>
                        <h2>witness Table</h2>
                        <AdminTable columns={witnesscolumn} rows={witness} />
                    </div><br />
                    <div style={{height:"400px",marginBottom:"20px"}}>
                        <h2>rptinspection_4</h2>
                        <AdminTable columns={inspectioncolumn} rows={inspection} />
                    </div><br />
                    <div style={{height:"400px",marginBottom:"20px"}}>
                        <h2>rptform1_5</h2>
                        <AdminTable columns={rptformcolumn} rows={rptform} />
                    </div><br />
                  </div>
                  }

     </AdminContainer>    
  );
}

export default AdminSearch;