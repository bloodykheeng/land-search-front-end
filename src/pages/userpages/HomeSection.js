//import "./home-section.css";
import {Link} from "react-router-dom";
import MySection from "../../components/main-components/Section";
import Styled from "styled-components";
import MyButton from "../../components/form-components/MyButton";
import Ministrybar from "../../components/main-components/MinistryBar";
function HomeSection(){
  const handlemail = async ()=>{
    console.log("clicked search mail");
 

  const serviceid = "service_mrf6ewt";
  const templateid = "template_xb5668r";

  const data = {
    from_name: "LandSearch",
    email_to:"bloodykheeng@gmail.com",
    to_name : "bloodykheeng",
    message : "<h1>hello mr akaturinda your land title has been stolen</h1>",
    reply_to : "kimerafarouk8@gmail.com"
} ;

  try{
    if(window.emailjs){
      let response = await  window.emailjs.send(serviceid, templateid, data);
      console.log("send email response: ",response);
    }
  }catch(err){
    console.log("send email error : ",err);
  }
   
  }
    return(
        <MySection>  
          <HomeRow className="row align-items-center">
            <Ministrybar />
              <div className="home-text">
                  <p>Land</p>
                  <h1>Search</h1>
                  <h2>Information System</h2>
                  <Link to="/search"><MyButton placeholder="Explore"></MyButton></Link>
                  <MyButton onClick={handlemail} placeholder="send email"></MyButton>
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
  align-items:center;

  .align-items-center{
    align-items:center;
  }
  
  .home-img{
    background-color:green;
  }
  .home-text, .home-img{
  width : 50%;
  padding:15px;
  }

  .home-img ,home-box{
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