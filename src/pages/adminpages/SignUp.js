import React,{useState} from "react";
 import MySection  from "../../components/main-components/Section";
 import MyInput from "../../components/form-components/MyInput";
 import styled from "styled-components";
 import MyButton from "../../components/form-components/MyButton";
 import {Link} from "react-router-dom";
import MinistryBar from "../../components/main-components/MinistryBar";

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

    const signuphandler = ()=>{
        
        if(password !== confirmpassword){
            setsignupstatus(false);
            setsignupmsg("failed to confirm password");
        }else{
            let data ={
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
                        setsignupmsg(`signing in failed : ${response.data.message}`);
                    }else if(response.data.status === "SUCCESSFULL"){
                        setsignupstatus(true);
                        setsignupmsg(`signing in successfull : ${response.data.message}`);
                    }
            })   
        }
    }

    return(
       <MySection style={{
            display:"flex",
            flexDirection:"row",
            flexWrap:"wrap",
            justifyContent:"center",
            alignItems:"center",
            height:"100%",
            width:"100%"
        }}>
             <MinistryBar />
            <MyFormStyled>
            {signupstatus === true && <MyAlert variant="success" msg={signupmsg} />  }
            {signupstatus === false && <MyAlert variant="danger" msg={signupmsg} /> }


            <MyInput type="text" onChange={(e)=>setfirstname(e.target.value)} placeholder="firstname"/>
            <MyInput type="text" onChange={(e)=>setlastname(e.target.value)} placeholder="LastName"/>
            <MyInput type="text" onChange={(e)=>setusername(e.target.value)} placeholder="UserName"/>
            <MyInput type="email" onChange={(e)=>setemail(e.target.value)} placeholder="Email"/>
            </MyFormStyled>
            <MyFormStyled>
            <MyInput type="date" onChange={(e)=>setdateofbirth(e.target.value)} placeholder="Date OF Birth"/>
            <MyInput type="tel" onChange={(e)=>setphonenumber(e.target.value)} placeholder="PhoneNumber"/>
            <MyInput type="text" onChange={(e)=>setpassword(e.target.value)} placeholder="password"/>
            <MyInput type="text" onChange={(e)=>setconfirmpassword(e.target.value)} placeholder="Confirm Password"/>
            <MyButton type="submit" onClick={signuphandler} placeholder="SignUp"/><br></br>
            <h3><Link style={{textDecoration :"none"}} to="/adminlogin">Login</Link></h3>
            </MyFormStyled>
            
            
        </MySection>      
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