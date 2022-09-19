import React ,{ useState} from 'react';
import MySection  from "../../components/main-components/Section";
 import MyInput from "../../components/form-components/MyInput";
 import styled from "styled-components";
 import MyButton from "../../components/form-components/MyButton";
import MinistryBar from "../../components/main-components/MinistryBar";
import {Link, useNavigate, useParams} from "react-router-dom";
import MyAlert from "../../components/form-components/MyAlert";
import Axios from "axios";

import Lottie from "lottie-react";
import InvalidToken from "../../lottiefiles/adminlotties/invalidtoken.json";
import PasswordUpdate from "../../lottiefiles/adminlotties/passwordupdate.json";
import loadingCircle from "../../lottiefiles/adminlotties/loadingCircle.json";




function ResetPassword(){
    const {adminid , token} = useParams();
    //const navigate = useNavigate();
    const [password , setpassword] = useState("");
    const [confirmpassword , setconfirmpassword] = useState("");
    const [message , setMessage] = useState("enter passwords");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const resetpassword = async ()=>{
        
        if(!password ||  !confirmpassword){
            setMessage("some input fields are empty");
        }else if(password !== confirmpassword){
            setMessage("Password missmatch");
        }else{
            const data = {
                adminid,
                token,
                password
            };

            setIsLoading(true);
            try{
                const res = await Axios.post("/resetpassword",data, {withCredentials : false});
                setIsLoading(false);
                console.log(res.data.status);
                console.log(res.data.message);
                if(res.data.status === "successfull" ){
                    setResponse("successfull");
                    setMessage(res.data.message);
                    
                }else if(res.data.status === "token-failed"){
                    setResponse("token-failed");
                    setMessage("The Token is Invalid");
                }else if(res.data.status === "failed"){
                    setMessage(res.data.message);
                }else{
                    setMessage("failed to update password try again or contact landsearch team");
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
            {!response && 
            <>
                {message && <MyAlert variant="danger" msg={message} />  }
            <MyInput type="password" onChange={(e)=>setpassword(e.target.value)}  placeholder="enter new password"/>

            <MyInput type="password" onChange={(e)=>setconfirmpassword(e.target.value)}  placeholder="repeat new password"/>
        
        <MyButton type="submit" onClick={resetpassword} placeholder="Submit"/><br></br>
        {isLoading &&  <div><Lottie style={{width:"100%"}} animationData={loadingCircle} loop={true}/></div> } 
        <b />

        <Link style={{textDecoration :"none"}} to="/forgotpassword"  className="mylink"><strong>Back</strong></Link>
            </>}
            {response === "successfull" && 
            <div>
                <h1>Succesfully updated password</h1>
                <div>
                     <Lottie style={{width:"100%"}} animationData={PasswordUpdate} loop={true}/>
                </div>

                <Link to="/adminlogin"><MyButton placeholder="Back"/></Link>
           
            </div>
            }
            
            {response === "token-failed" && 
                <div>
                <h1>Faulty Token</h1>
                <div>
                     <Lottie style={{width:"100%"}} animationData={InvalidToken} loop={true}/>
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


export default ResetPassword;