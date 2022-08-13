
 import MySection from "../main-components/section";
 import MyInput from "../form-components/MyInput";
 import styled from "styled-components";
 import MyButton from "../form-components/MyButton";
 import {Link} from "react-router-dom";
import MinistryBar from "../main-components/ministrybar";

 const SignUp = ()=>{
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
            <MyInput type="text" placeholder="firstname"/>
            <MyInput type="text" placeholder="LastName"/>
            <MyInput type="text" placeholder="UserName"/>
            <MyInput type="email" placeholder="Email"/>
            </MyFormStyled>
            <MyFormStyled>
            <MyInput type="date" placeholder="Date OF Birth"/>
            <MyInput type="tel" placeholder="PhoneNumber"/>
            <MyInput type="text" placeholder="password"/>
            <MyInput type="text" placeholder="Confirm Password"/>
            <MyButton type="submit"  placeholder="SignUp"/><br></br>
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