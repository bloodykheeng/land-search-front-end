import React, { useState,useContext } from 'react'
import AdminContainer from '../../components/admin-components/AdminContainer';
import AdminSearchBar from '../../components/admin-components/AdminSearchBar';
import AdminTable from '../../components/admin-components/AdminTable';
import MyButton from '../../components/form-components/MyButton';
import Lottie from "lottie-react";
import SearchingLottie from "../../lottiefiles/adminlotties/searchinglottie.json"
import { ToastContainer, toast } from 'react-toastify';
import NoData from "../../lottiefiles/adminlotties/nodata.json";
import loadingCircle from "../../lottiefiles/adminlotties/loadingCircle.json";

import {
    cldcolumn, ownercolumn, neighbourcolumn, witnesscolumn, inspectioncolumn, rptformcolumn} from './AdminColumns';

import Axios from "axios";

import { isAdminData ,isAdminAuth ,isAdminSession } from './AdminAuthContext';

function AdminSearch(){
    const {setAdminAuth} = useContext(isAdminAuth);
    const {setAdminSession} = useContext(isAdminSession);
    const {setAdminData } = useContext(isAdminData);

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
    const [isLoading , setIsLoading] = useState(false);



    const click = async ()=>{
        setIsLoading(true);
        if(!clinnumber){
            setIsLoading(false);
            seterrors("first enter a clin number");
        }else{
            setIsLoading(true);
            seterrors();
            const data = {
                clinnumber
            }
            //bellow we call our adminsearch api from the backend to fetch data from the database
              try{
                let res = await Axios.post("/adminsearch", data,{withCredentials : false});
                console.log(res.data);
                setIsLoading(false);
                
                if(res.data.status === "cookie-failed"){
                    console.log(res.data.auth);
                    setAdminAuth(res.data.auth);
                    setAdminData(false);
                    setAdminSession("session expired");
                }else if(res.data.status === "token-failed"){
                    console.log(res.data.message)
                    setAdminAuth(res.data.auth)
                    setAdminData(false);
                    setAdminSession("session expired");
                }else if(res.data.status === "successfull"){
                    setAdminSession(true);
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
                setIsLoading(false);
                console.log(err);
                toast.error("Server Down");
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
         <div style={{width:"100%",height : "100%" , position:"relative"}}>


    {showsearch && <Lottie style={{width:"100%",position:"absolute"}} animationData={SearchingLottie} loop={true}/>}
         
        {showsearch && <AdminSearchBar click={click} onChange={(e)=>{ setclinnumber(e.target.value)}} errors={errors}/> }
   
        
    
        {nouser && 
                    <div style={{display:"flex", justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"20px"}}>
                    <div>
                    <h1>No record found attached to this clin number : {clinnumber}</h1>
                    <MyButton  placeholder="Back" onClick={handleback}/>
                    </div>
                    <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                    <Lottie style={{width:"100%"}} animationData={NoData} loop={true}/>
                    </div>
                    </div>
         }

                {isLoading && 
                    <div style={{display:"flex", justifyContent:"center",alignItems:"center",flexDirection:"column",padding:"20px",width:"100%",height:"100%"}}>
                    <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                    <Lottie style={{width:"200px",height:"200px"}} animationData={loadingCircle} loop={true}/>
                    </div>
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
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
     </AdminContainer>    
  );
}

export default AdminSearch;