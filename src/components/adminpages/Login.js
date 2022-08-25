import React ,{useContext, useState} from 'react';
import MySection from "../main-components/section";
import MyInput from "../form-components/MyInput";
import styled from "styled-components";
import MyButton from "../form-components/MyButton";
import {Link, Navigate, useNavigate} from "react-router-dom";
import MinistryBar from '../main-components/ministrybar';
import Axios from "axios";
import { isAdminAuth } from './adminAuthContext';



function MyForm(){
    const {adminAuth,setAdminAuth} = useContext(isAdminAuth);
    const [username , setusername] = useState("");
    const [password , setpassword] = useState("");
    const navigate = useNavigate();
   
    const login = ()=>{
        <Navigate replace to="/adminupload"/>
      
        const data = {
            username: username,
            password:password
        }
      console.log(username);
      console.log(password);
        Axios.post("/login",data, {withCredentials : false})
        .then((response)=>{
            console.log(response.data);
            if(response.data.auth === false){
               
                navigate("/adminupload");
                console.log("tsap")
                setAdminAuth(false);
            }else{
                setAdminAuth(true);
                navigate("/");
                
                console.log("admin auth : ",adminAuth);
            }
            setAdminAuth(true);
            console.log("admin auth : ",adminAuth);
           
        })
     
    }
    return(
        <MySection style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            height:"100%",
            width:"100%"
        }}>
            <MinistryBar />
            <MyFormStyled>
            <MyInput type="text" onChange={(e)=>setusername(e.target.value)} placeholder="firstname"/>
            <MyInput type="text" onChange={(e)=>setpassword(e.target.value)}  placeholder="LastName"/>
            <MyButton type="submit" onClick={login} placeholder="Login"/><br></br>
            
            <h3><Link style={{textDecoration :"none"}} to="/adminsignup">Sign Up</Link></h3>
            <Link style={{textDecoration :"none"}} to="/adminhome"  className="mylink"><strong>Back</strong></Link>
            </MyFormStyled>
        </MySection>
    )
}


const MyFormStyled = styled.div`
min-width:100px;
max-width:60%;
height:100%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-color:var(--white-alpha-25);
border:1px solid var(--white-alpha-40);
padding:50px;
border-radius:10px;
text-decoration:none;
`;

export default MyForm;