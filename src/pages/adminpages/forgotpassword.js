import React ,{useContext, useState,useEffect} from 'react';
import MySection  from "../../components/main-components/Section";
 import MyInput from "../../components/form-components/MyInput";
 import styled from "styled-components";
 import MyButton from "../../components/form-components/MyButton";
import MinistryBar from "../../components/main-components/MinistryBar";
import {Link} from "react-router-dom";
import MyAlert from "../../components/form-components/MyAlert";
import Axios from "axios";

import Lottie from "lottie-react";
import NoUser from "../../lottiefiles/adminlotties/usernotfound.json";
import EmailSent from "../../lottiefiles/adminlotties/emailsent.json";
import loadingCircle from "../../lottiefiles/adminlotties/loadingCircle.json";

import emailjs from "@emailjs/browser";


function ForgotPassword(){

    const [email , setemail] = useState("");
    const [message , setMessage] = useState("fill in to LogIn");
    const [show , setShow] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const checkemail = async ()=>{
        if(!email  ){
            setMessage("please you must first enter an email");
        }else{
            const data = {
                email: email
            };
            setIsLoading(true);
            try{
                const res = await Axios.post("/fogotpassword",data, {withCredentials : false});
                

                if(res.data.status === "SUCESSFULL" ){

                    const serviceid = "service_mrf6ewt";
                    const templateid = "template_xb5668r";
                    const publickey = "fcTjLWSnhcZiQlj1a";

                    let adminid = res.data.adminid;
                    let token = res.data.token;
                    let  adminfirstName = res.data.adminfirstName;
                    let adminlastName = res.data.adminlastName;
                    let email = res.data.email;

                    let link = `http://localhost:3000/resetpassword/${adminid}/${token}`;

                    const data = {
                        from_name: "LandSearch",
                        email_to: email,
                        to_name : `${adminfirstName} , ${adminlastName}`,
                        message : `The link below is valid within 15minutes : copy and paste this link in the browser to reset password : ${link}`,
                        reply_to : "noreply"
                    };

                    try{
    
                        let response = await emailjs.send(serviceid, templateid, data, publickey );
                        console.log("send email response: ",response);
                        console.log("send email response: ",response);
                          setMessage("A link has been sent to your email inbox valid for 15 minutes go check it and click on it");
                          setShow("successfull");
                          setIsLoading(false);
                     
                    }catch(err){
                      console.log("send email error : ",err);
                    }
                        
                }else{
                    setMessage(res.data.message);
                    setShow("failed");
                }
                   
            }catch(err){
                console.log(err);
            }
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
        {!show && 
            <>
            {message && <MyAlert variant="danger" msg={message} />  }
        <MyInput type="email" onChange={(e)=>setemail(e.target.value)} placeholder="enter email"/>
        
        <MyButton type="submit" onClick={checkemail} placeholder="Submit"/><br></br>
        {isLoading &&  <div><Lottie style={{width:"100%"}} animationData={loadingCircle} loop={true}/></div> }

        <Link style={{textDecoration :"none"}} to="/adminlogin"  className="mylink"><strong>Back</strong></Link>
            </>}

            {show === "successfull" && 
                <div>
                <h1>{message}</h1>
                <div>
                     <Lottie style={{width:"100%"}} animationData={EmailSent} loop={true}/>
                </div>

                <Link to="/adminlogin"><MyButton placeholder="Back"/></Link>
           
            </div>
            }

            {show === "failed" && 
                <div>
                <h1>{message}</h1>
                <div>
                     <Lottie style={{width:"100%"}} animationData={NoUser} loop={true}/>
                </div>

                <Link to="/adminlogin"><MyButton placeholder="Back"/></Link>
           
            </div>
            }
            
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