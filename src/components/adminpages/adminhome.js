import Styled from "styled-components";
import MyButton from "../form-components/MyButton";
import Section from "../main-components/section";
import {Link} from "react-router-dom";
import MinistryBar from "../main-components/ministrybar";

const AdminHome = ()=>{
    
    return(
        <Section>
            <MyDiv>
            <MinistryBar />
            <div className="greating">
            <h1>Hello Admin You are welcome</h1>
            <p>feel free to ! </p>
            <Link to="/adminlogin"><MyButton placeholder="Navigate"/></Link>
             <Link to="/" className="mylink">back to search</Link>
            </div>
            </MyDiv>
        </Section>
    );
}

const MyDiv = Styled.div`
width:100%;
height:100%;
.greating {
    position:relative;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100%;
    line-height:30px;
}
`;

export default AdminHome;