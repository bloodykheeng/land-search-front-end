import React,{useState , useContext} from 'react'
import MySection  from "../../components/main-components/Section";
import MyProgress from "./fileupload/Progress";
import Axios from "axios";
import {Form ,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


import MyAlert from '../../components/form-components/MyAlert';
import { isAdminData } from './AdminAuthContext';

const FileUpload = () => {
    const {adminData } = useContext(isAdminData);
    const [file , setfile] = useState("");
    const [filename,setfilename] = useState("choose file");
    const [uploadedfile, setuploadedfile] = useState({});
    const [message,setmessage] = useState("");
    const [uploadpercentage, setuploadpercentage] = useState(0);

    const onChange = (e)=>{
        if(!e.target.files[0]){
            setmessage("")
        }else{
            setfile(e.target.files[0]);
        console.log(e.target.files[0])
       // setfilename(e.target.files[0].name);
        }
        
    }

    const onSubmit = async (e)=>{

        if(!file){
            setmessage("please first choose your file the press upload");
        }else{

        e.preventDefault();
        const formdata = new FormData();
        formdata.append("file",file);
        try{
            const res = await Axios.post(
                "/fileupload",
                formdata,{
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
        setTimeout(()=>setuploadpercentage(0),10000);
        const {fileName,filePath} = res.data;
        setuploadedfile({fileName,filePath});
        setmessage("file uploaded");
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

  return (
    <MySection>
        <Link to="/adminupload"  className="mylink">refresh</Link>
        <h1>Hello Mr {adminData.firstName} !</h1>
        <MyAlert variant="success" msg="choose an excell file to upload data"/>
        {uploadedfile && <MyAlert variant="success" msg={message}/>}

        <Form onSubmit={onSubmit}>

        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>{filename ? filename : "press below to choose a file"}</Form.Label>
        <Form.Control type="file" onChange = {onChange} />

        <MyProgress percentage={uploadpercentage}/>

        <Button type="submit" variant="outline-primary">Upload File</Button>
      </Form.Group>
      </Form>
    </MySection>
  )
}

export default FileUpload;