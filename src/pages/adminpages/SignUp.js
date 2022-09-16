import React,{useState} from "react";
 import MyInput from "../../components/form-components/MyInput";
 import styled from "styled-components";
 import MyButton from "../../components/form-components/MyButton";
 import {Link} from "react-router-dom";
import AdminContainer from "../../components/admin-components/AdminContainer";

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Axios from "axios";
import MyAlert from "../../components/form-components/MyAlert";

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


   
      const  handleselect = (event) => {
        setaccounttypeid(event.target.value);
      };

    const signuphandler = ()=>{
        
        if(password !== confirmpassword){
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
                    console.log(response.data);
                    if(response.data.status === "FAILED"){
                        setsignupstatus(false);
                        setsignupmsg(`signup failed : ${response.data.message}`);
                    }else if(response.data.status === "SUCCESSFULL"){
                        setsignupstatus(true);
                        setsignupmsg(`signup successfull : ${response.data.message}`);
                    }
            })   
        }
    }

    return(
        <AdminContainer>
        <div style={{display : "flex",alignItems:"center", padding:"20px"}}>
        <MyFormStyled>
              {signupstatus === true && <MyAlert variant="success" msg={signupmsg} />  }
              {signupstatus === false && <MyAlert variant="danger" msg={signupmsg} /> }
          
              <Box sx={{ minWidth: 120 }}>
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
              <MyInput type="text" onChange={(e)=>setfirstname(e.target.value)} placeholder="enter firstname"/>
              <MyInput type="text" onChange={(e)=>setlastname(e.target.value)} placeholder="enter LastName"/>
              <MyInput type="text" onChange={(e)=>setusername(e.target.value)} placeholder="enter UserName"/>
              <MyInput type="email" onChange={(e)=>setemail(e.target.value)} placeholder="enter Email"/>
              </MyFormStyled>
              <MyFormStyled>
              <strong>Enter Date Of Birth</strong>
              <MyInput type="date" onChange={(e)=>setdateofbirth(e.target.value)} placeholder="enter Date OF Birth"/>
              <MyInput type="tel" onChange={(e)=>setphonenumber(e.target.value)} placeholder="enter PhoneNumber"/>
              <MyInput type="password" onChange={(e)=>setpassword(e.target.value)} placeholder="enter password"/>
              <MyInput type="password" onChange={(e)=>setconfirmpassword(e.target.value)} placeholder="repeat Password "/>
              <MyButton type="submit" onClick={signuphandler} placeholder="SignUp"/><br></br>
              </MyFormStyled>
        </div>
      </AdminContainer>
    )
 }
 const MyFormStyled = styled.div`
 min-width:100px;
 max-width:70%;
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