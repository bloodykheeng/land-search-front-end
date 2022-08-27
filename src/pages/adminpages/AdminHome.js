import Styled from "styled-components";
import MyButton from "../../components/form-components/MyButton";
import Section from "../../components/main-components/Section";
import {Link} from "react-router-dom";
import MinistryBar from "../../components/main-components/MinistryBar"; 

const AdminHome = ()=>{
    
    return(
        <Section>
            <MyDiv>
            <MinistryBar />
            <div className="greating">
            <h1>Hello Admin You are welcome</h1>
            <strong>feel free to  </strong>
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