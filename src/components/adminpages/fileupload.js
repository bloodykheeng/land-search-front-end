import React,{useState} from 'react'
import MySection from '../main-components/section';
import MyProgress from "./fileupload/Progress";
import Axios from "axios";
import {Form ,Button} from 'react-bootstrap';


import Messagealert from './fileupload/messages';

const FileUpload = () => {
    const [file , setfile] = useState("");
    const [filename,setfilename] = useState("choose file");
    const [uploadedfile, setuploadedfile] = useState({});
    const [message,setmessage] = useState("");
    const [uploadpercentage, setuploadpercentage] = useState(0);

    const onChange = (e)=>{
        setfile(e.target.files[0]);
        setfilename(e.target.files[0].name);
    }

    const onSubmit = async (e)=>{
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
        setTimeout(()=>setuploadpercentage(0),10000)
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

  return (
    <MySection>
        <Form onSubmit={onSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>{filename}</Form.Label>
        <Form.Control type="file" onChange = {onChange} />
        <MyProgress percentage={uploadpercentage}/>
        <Button type="submit" variant="outline-primary">Primary</Button>
      </Form.Group>
      </Form>

      {uploadedfile && <Messagealert msg={message}/>}
    </MySection>
  )
}

export default FileUpload;