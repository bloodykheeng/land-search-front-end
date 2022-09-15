import React ,{useContext, useState,useEffect} from 'react';
import MySection  from "../../components/main-components/Section";
 import MyInput from "../../components/form-components/MyInput";
 import styled from "styled-components";
 import MyButton from "../../components/form-components/MyButton";
import MinistryBar from "../../components/main-components/MinistryBar";
import {Link, useNavigate} from "react-router-dom";
import Axios from "axios";


function ForgotPassword(){

    const navigate = useNavigate();
    const [email , setemail] = useState("");
    const [password , setpassword] = useState("");
    const [message , setMessage] = useState("fill in to LogIn");

    // status:"SUCESSFULL",
    // message:"email exists",
    // link,
    // adminfirstName,
    // adminlastName,
    // email

    const handlemail = async ()=>{
        
      const serviceid = "service_mrf6ewt";
      const templateid = "template_xb5668r";
    
      const data = {
        from_name: "LandSearch",
        email_to: email,
        to_name : `${adminfirstName} , ${adminlastName}`,
        message : `copy and paste this link in the browser to reset password : ${link}.`,
        reply_to : "noreply"
    } ;

    const update = ()=>{
        if(!email  ){
            setMessage("please you must first enter an email");
        }else{
            const data = {
                email: email
            };
          
            Axios.post("/fogotpassword",data, {withCredentials : false})
            .then((response)=>{
                if(response.data.status === "SUCESSFULL" ){

                    setMessage("A link has been sent to your email inbox valid for 15 minutes");
                }
              
                
                    //navigate("/admindashboard");
                
            });
        }
      
    }

  return (
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
        <MyInput type="email" onChange={(e)=>setemail(e.target.value)} placeholder="enter email"/>
        <MyInput type="password" onChange={(e)=>setpassword(e.target.value)}  placeholder="enter password"/>

        <MyButton type="submit" onClick={update} placeholder="Update_Password"/><br></br>
        
        <Link style={{textDecoration :"none"}} to="/adminlogin"  className="mylink"><strong>Back</strong></Link>
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


export default ForgotPassword;