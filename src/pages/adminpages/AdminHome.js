import Styled from "styled-components";
import MyButton from "../../components/form-components/MyButton";
import Section from "../../components/main-components/Section";
import {Link} from "react-router-dom";
import MinistryBar from "../../components/main-components/MinistryBar"; 
import Lottie from "lottie-react";
import Exploring from "../../lottiefiles/adminlotties/50356-explore-button.json";

const AdminHome = ()=>{
    
    return(
        <Section>
            <MyDiv>
            <div style={{width:"50%"}}>
                <MinistryBar />
                <div style={{width:"100%"}}>
                <Lottie animationData={Exploring} loop={true} autoplay = {true} />
                </div>
            </div>
            
            <div className="greating">
            <h3><strong>Hello Admin You are welcome</strong></h3>
            <strong>feel free to  </strong>
            <Link to="/adminlogin" style={{textDecoration:"none"}}><MyButton placeholder="Navigate"/></Link>
             <Link style={{textDecoration:"none"}} to="/" className="mylink"><strong>User Search</strong></Link>
            </div>
            </MyDiv>
        </Section>
    );
}

const MyDiv = Styled.div`
width:100%;
height:100%;
display:flex;
align-items:center;
justify-content:center;
flex-wrap:wrap;
.greating {
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:center;
    width:50%;
    height:100%;
    line-height:30px;
}
`;

export default AdminHome;