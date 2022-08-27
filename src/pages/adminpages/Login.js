import React ,{useContext, useState} from 'react';
import MySection  from "../../components/main-components/Section";
import MyInput from "../../components/form-components/MyInput";
import styled from "styled-components";
import MyButton from "../../components/form-components/MyButton";
import {Link, useNavigate} from "react-router-dom";
import MinistryBar from '../../components/main-components/MinistryBar';
import Axios from "axios";
import { isAdminAuth, isAdminData } from './AdminAuthContext';
import MyAlert from "../../components/form-components/MyAlert";


function MyForm(){
    const navigate = useNavigate();
    const { setAdminAuth} = useContext(isAdminAuth);
    const {setAdminData} = useContext(isAdminData);
    const [username , setusername] = useState("");
    const [password , setpassword] = useState("");
    const [message , setMessage] = useState("fill in to LogIn");
    const [loginStatus, setLoginStatus] = useState("");

    const login = ()=>{

        const data = {
            username: username,
            password:password
        }
      
        Axios.post("/login",data, {withCredentials : false})
        .then((response)=>{
            if(!response.data.auth){
                setAdminAuth(false);
                setLoginStatus(false)
                setMessage(response.data.message);
            }else{
                setMessage(response.data.message);
                setLoginStatus(true)
                setAdminAuth(true);
                setAdminData(response.data.data[0]);
                navigate("/admindashboard");
            }
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
                {loginStatus === "" && <MyAlert variant="success" msg={message} />  }
                {loginStatus === true && <MyAlert variant="success" msg={message} />  }
                {loginStatus === false && <MyAlert variant="danger" msg={message} /> }
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