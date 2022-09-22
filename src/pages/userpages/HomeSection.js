//import "./home-section.css";
import {Link} from "react-router-dom";
import MySection from "../../components/main-components/Section";
import Styled from "styled-components";
import MyButton from "../../components/form-components/MyButton";
import Ministrybar from "../../components/main-components/MinistryBar";

function HomeSection(){

    return(
        <MySection>  
          <HomeRow className="row align-items-center">
            <Ministrybar />
              <div className="home-text">
                  <p>Land</p>
                  <h1>Search</h1>
                  <h2>Information System</h2>
                  <Link style={{textDecoration:"none"}} to="/search"><MyButton placeholder="Explore"></MyButton></Link>
              </div>
              <div className="home-img">
                  <div className="img-box">
                      <img  src="images/coatOfArms.png" alt="home-img" />
                  </div>
              </div>
          </HomeRow>
          </MySection>
    );
}

const HomeRow = Styled.div`
  display:flex;
  flex-wrap:wrap;
  align-items:stretch;
  
  .align-items-center{
    align-items:stretch;
  }
  @media (max-width : 650px){
    flex-direction : column
  }
 
  
  .home-img{
    background-color:green;
  }
  .home-text, .home-img{
  width : 50%;
  padding:15px;
  @media (max-width : 650px){
    width : 100%;
    display:flex;
    flex-wrap:wrap;
    flex-direction:column;
    align-items : center;
  }
  }

  .home-img {
    max-width:360px;
    background-color:var(--white-alpha-25);
    border-radius:50%;
    border:8px solid var(--white-alpha-40);
    margin:auto;
  }

  .home-img .img-box img{
    width:100%;
  }
    
  .home-text p{
    font-size:18px;
  }
  .home-text h1{
    font-size:50px;
    text-transform:capitalize;
  }
  .home-text h2{
    font-size:20px;
    text-transform:capitalize;
    font-weight:300;
    margin:0 0 30px;
  }
  

`;

export default HomeSection;