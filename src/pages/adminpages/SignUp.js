import React,{useState} from "react";
 import MyInput from "../../components/form-components/MyInput";
 import styled from "styled-components";
 import MyButton from "../../components/form-components/MyButton";
 import {Link} from "react-router-dom";
import AdminContainer from "../../components/admin-components/AdminContainer";
import { ToastContainer, toast } from 'react-toastify';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Axios from "axios";
import Lottie from "lottie-react";
import PasswordUpdate from "../../lottiefiles/adminlotties/passwordupdate.json";
import loadingCircle from "../../lottiefiles/adminlotties/loadingCircle.json";

 const SignUp = ()=>{
    const [signupstatus, setsignupstatus] = useState("start");
    const [signupmsg, setsignupmsg] = useState("");
    const [firstname , setfirstname] = useState("");
    const [lastname , setlastname] = useState("");
    const [username , setusername] = useState("");
    const [dateofbirth , setdateofbirth] = useState("");
    const [email , setemail] = useState("");
    const [phonenumber , setphonenumber] = useState("");
    const [password , setpassword] = useState("");
    const [confirmpassword , setconfirmpassword] = useState("");
    const [accounttypeid,setaccounttypeid] = useState("");
    const [showform,setShowForm] = useState(true);
    const [isLoading,setIsLoading] = useState(false);


   
      const  handleselect = (event) => {
        setaccounttypeid(event.target.value);
      };

    const signuphandler = ()=>{
        setIsLoading(true);
        if(password !== confirmpassword){
            setIsLoading(false);
            setsignupstatus(false);
            setsignupmsg("passwords donot match");
        }else{
            
            let data ={
                accounttypeid,
                firstName : firstname,
                lastName : lastname,
                userName : username,
                dateOfBirth : dateofbirth,
                email : email,
                phoneNumber : phonenumber,
                password : password,
            }
            Axios.post("/signup",data,{withCredentials:false}).then(
                (response)=>{
                    setIsLoading(false);
                    console.log(response.data);
                    if(response.data.status === "FAILED"){
                        setShowForm(true);
                        setsignupstatus(false);
                        setsignupmsg(`signup failed : ${response.data.message}`);
                    }else if(response.data.status === "SUCCESSFULL"){
                        setsignupstatus(true);
                        setsignupmsg(`signup successfull : ${response.data.message}`);
                        setShowForm(false)
                    }
            }).catch((err)=>{
                setIsLoading(false);
                console.log("signup err : ".err);
                toast.error("Server Down");
            })  
        }
    }

    return(
        <AdminContainer activeTab="signup">
        <div style={{display : "flex",alignItems:"center", padding:"20px"}}>
            {showform && 
            <>
                <MyFormStyled>
                {signupstatus === true && <h3 style={{color:"red"}}>{signupmsg}</h3>  }
                {signupstatus === false &&<h3 style={{ color:"red",wordWrap : "wrap",width:"100%"}}>{signupmsg}</h3> }
                <br />
                <Box sx={{ minWidth: "85%" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">AccountType</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={accounttypeid}
                    label="AccountType"
                    onChange={ handleselect }
                    >
                    <MenuItem value={1}>creator_admin</MenuItem>
                    <MenuItem value={2}>normal_admin</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                <MyInput type="text"  autoComplete="off" onChange={(e)=>setfirstname(e.target.value)} placeholder="enter firstname"/>
                <MyInput type="text" autoComplete="off" onChange={(e)=>setlastname(e.target.value)} placeholder="enter LastName"/>
                <MyInput type="text" autoComplete="off" onChange={(e)=>setusername(e.target.value)} placeholder="enter UserName"/>
                <MyInput type="email" autoComplete="off" onChange={(e)=>setemail(e.target.value)} placeholder="enter Email"/>
                </MyFormStyled>
                <MyFormStyled>
                <strong>Enter Date Of Birth</strong>
                <MyInput type="date" autoComplete="off" onChange={(e)=>setdateofbirth(e.target.value)} placeholder="enter Date OF Birth"/>
                <MyInput type="number" autoComplete="off" onChange={(e)=>setphonenumber(e.target.value)} placeholder="enter PhoneNumber"/>
                <MyInput type="password" autoComplete="off" onChange={(e)=>setpassword(e.target.value)} placeholder="enter password"/>
                <MyInput type="password" autoComplete="off" onChange={(e)=>setconfirmpassword(e.target.value)} placeholder="repeat Password "/>
                <MyButton type="submit" onClick={signuphandler} placeholder="SignUp"/><br></br>

                {isLoading &&  <div><Lottie style={{width:"100%"}} animationData={loadingCircle} loop={true}/></div> } 
                </MyFormStyled>
            </>
            }

        {!showform  && 
                <div>
                <h4>{signupmsg}</h4>
                <div>
                <Lottie style={{height:"300px"}} animationData={PasswordUpdate} loop={true}/>
                </div>

                <MyButton onClick={()=>setShowForm(true)} placeholder="Back"/>
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
    )
 }
 const MyFormStyled = styled.div`
 width:50%;
 height:100%;
 display:flex;
 flex-direction:column;
 justify-content:center;
 align-items:center;
 background-color:var(--white-alpha-25);
 border:1px solid var(--white-alpha-40);
 padding:50px;
 border-radius:10px;
 margin:10px;
 `;
 export default SignUp;