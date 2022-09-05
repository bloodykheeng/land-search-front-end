import React,{useState , useContext} from 'react'
import MyProgress from "./fileupload/Progress";
import Axios from "axios";
import {Form ,Button} from 'react-bootstrap';

import AdminContainer from '../../components/admin-components/AdminContainer';
import { isAdminData ,isAdminAuth } from './AdminAuthContext';
import styled from 'styled-components';
import AdminButton from '../../components/admin-components/AdminButton';

const FileUpload = () => {
    const {adminData } = useContext(isAdminData);
    const {setAdminAuth} = useContext(isAdminAuth);

    const [file , setfile] = useState("");
    const [zipfile, setzipfile] = useState("");
    const [filename, setfilename] = useState("choose file");
    const [zipfilename, setzipfilename] = useState("");
    const [message,setmessage] = useState("");
    const [uploadpercentage, setuploadpercentage] = useState(0);
    const [success , setsuccess] = useState("");

    const onChange = (e)=>{
        if(e.target.id === "xcellupload"){
            if(!e.target.files[0]){
                setmessage("")
            }else{
                setfile(e.target.files[0]);
             //console.log(e.target.files[0])
            // console.log(e.target.files[0].name);
           setfilename(e.target.files[0].name);
           //console.log(e.target.files[0].name.split(".").pop());
            }
        }else if(e.target.id === "zipupload"){
            if(!e.target.files[0]){
                setmessage("")
            }else{
                setzipfile(e.target.files[0]);
            // console.log(e.target.files[0])
            // console.log(e.target.files[0].name);
           setzipfilename(e.target.files[0].name);
            }
        }
       
        
    }

    const onSubmit = async (e)=>{
    
        if(!file || !zipfile){
            setmessage("please first choose an excell and a geodatabase zip file & then press upload");
            console.log("no file set ");
        }else{
            const excelext = filename.split(".").pop();
            const zipext = zipfilename.split(".").pop();
            if(excelext !== "xlsx" || zipext !== "zip"){
                console.log("wrong extensionsnn");
                setsuccess("please first choose the correct files");
            }else{

                setmessage("uploading file");
                // const formdata = new FormData();
                // formdata.append("file",file);
                let data = {
                    excelfile : file,
                    zipfile : zipfile
                }
                try{
                    const res = await Axios.post(
                        "/fileupload",
                        data,{
                        headers:{"Content-Type":"multipart/form-data"},
                        onUploadProgress: ProgressEvent =>{
                            setuploadpercentage(
                                parseInt(
                                    Math.round(
                                        (ProgressEvent.loaded * 100)/ProgressEvent.total
                                    )
                                )
                            );
                         }
                });
        
                //clear percentage
                setTimeout(()=>{
                    setuploadpercentage(0);
                    setfile(null);
                    setzipfile(null);
                },1000);

                console.log(res.data.message);
                if(res.data.status === "cookie-failed"){
                    setmessage(res.data.auth);
                    setAdminAuth(res.data.auth)
                }else if(res.data.status === "token-failed"){
                    setmessage(res.data.message)
                    setAdminAuth(res.data.auth)
                }
                else{
                    setsuccess("files uploaded succesfuly jjjj");
                }
                
                
                // const {fileName,filePath} = res.data;
                // console.log(res.data);
                // console.log(fileName);
                // setuploadedfile({fileName,filePath});
                }catch(err){
                if(err.response.status === 500){
                    setmessage("There was a problem with the server");
                }else{
                    setmessage(err.response.data.msg);
                }
                setuploadpercentage(0);
                } 
            }
          
         
    }
    }

  return (
    <AdminContainer>
         <UploadContainer>
                <MyProgress percentage={uploadpercentage}/>
                <p style={{margin:0}}>Hello Mr {adminData.firstName} !</p>
                <p style={{margin:0,padding:0}}>choose an excell and a geodatabase shape file to upload data : </p> 

                {success && <p style={{color:"green",
                margin:0,padding:0}}>{success}</p> }

                {(!file || !zipfile) && <p style={{color:"red"}}>{message}</p> }
             
            
                        
                        {/* label and input field for xcel upload */}

                        <label htmlFor="xcellupload">{file ? <AdminButton  style={{color:"green"}} placeholder={filename} /> :<AdminButton style={{color:"red"}} placeholder="Choose an Excell File *"/> }</label>
                        
                        <input id="xcellupload" style={{visibility:"hidden", margin:"0px",padding:"0px",lineHeight:0}} type="file" onClick={(e)=>{
                            setfile(null);
                            e.target.value = null;
                            setsuccess("");
                            }} onChange = {onChange} />

                        {/* label and input field for zip upload */}

                        <label htmlFor="zipupload">{zipfile ? <AdminButton  style={{color:"green"}} placeholder={zipfilename} /> :<AdminButton style={{color:"red"}} placeholder="Choose a zip File containing the GeoDatabase *"/> }</label>
                        
                        <input id="zipupload" style={{visibility:"hidden",margin:"0px",padding:"0px",lineHeight:0}} type="file" onClick={(e)=>{
                            setzipfile(null);
                            e.target.value = null;
                            setsuccess("");
                            }} onChange = {onChange} /><br />

                        <Button onClick={onSubmit} variant="outline-primary">Upload Files</Button>
                   
      </UploadContainer>
      </AdminContainer>
  )
}

const UploadContainer = styled.div`
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    padding: 20px;
    margin: 20px;
    border-radius:10px;
    width:50%;
`;

export default FileUpload;