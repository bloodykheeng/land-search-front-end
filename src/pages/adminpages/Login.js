import React ,{useContext, useState,useEffect} from 'react';
import MySection  from "../../components/main-components/Section";
import MyInput from "../../components/form-components/MyInput";
import styled from "styled-components";
import MyButton from "../../components/form-components/MyButton";
import {Link, useNavigate} from "react-router-dom";
import MinistryBar from '../../components/main-components/MinistryBar';
import Axios from "axios";
import { isAdminAuth, isAdminData , isAdminSession} from './AdminAuthContext';
import MyAlert from "../../components/form-components/MyAlert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Lottie from "lottie-react";
import loadingCircle from "../../lottiefiles/adminlotties/loadingCircle.json";



function MyForm(){
    const navigate = useNavigate();
    const { setAdminAuth} = useContext(isAdminAuth);
    const {setAdminData} = useContext(isAdminData);
    const {adminSession,setAdminSession} = useContext(isAdminSession);
    const [username , setusername] = useState("");
    const [password , setpassword] = useState("");
    const [message , setMessage] = useState("fill in to LogIn");
    const [loginStatus, setLoginStatus] = useState("");
    const [isLoading,setIsLoading] = useState(false);


    useEffect(()=>{
       
         adminSession === "session expired" && toast("Session expired");
         adminSession === "logged out" && toast("logged out");   
    },[adminSession])

    const login = ()=>{
        if(!username || !password ){
            setMessage("some inputs are empty");
        }else{
            setIsLoading(true);
            const data = {
                username: username,
                password:password
            };
          
            Axios.post("/login",data, {withCredentials : false})
            .then((response)=>{
                setIsLoading(false);
                if(!response.data.auth){
                    setAdminAuth(false);
                    setLoginStatus(false)
                    setMessage(response.data.message);
                }else{
                    setMessage(response.data.message);
                    setLoginStatus(true)
                    setAdminAuth(true);
                    setAdminData(response.data.data[0]);
                    setAdminSession(true)
                    navigate("/admindashboard");
                }
            }).catch(
                (err)=>{
                    console.log(err)
                    setIsLoading(false);
                    toast.error("Server Down");
                }
                );
        }
      
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
                {loginStatus === "" && <MyAlert variant="success" msg={message} />  }
                {loginStatus === true && <MyAlert variant="success" msg={message} />  }
                {loginStatus === false && <MyAlert variant="danger" msg={message} /> }
            <MyInput type="text" autoComplete="off" onChange={(e)=>setusername(e.target.value)} placeholder="enter firstname"/>
            <MyInput type="password" autoComplete="off" onChange={(e)=>setpassword(e.target.value)}  placeholder="enter password"/>
            <MyButton type="submit" onClick={login} placeholder="Login"/><br></br>
            {isLoading &&  <div><Lottie style={{width:"100%"}} animationData={loadingCircle} loop={true}/></div> }
            
            <h4><Link style={{textDecoration :"none"}} to="/forgotpassword">Forgot Password</Link></h4>
            <Link style={{textDecoration :"none"}} to="/adminportal"  className="mylink"><strong>Back</strong></Link>
            </MyFormStyled>
            
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