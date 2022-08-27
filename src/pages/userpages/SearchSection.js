import MySection from "../../components/main-components/Section";
import Ministrybar from "../../components/main-components/MinistryBar";
import styled from "styled-components";
import MyButton from "../../components/form-components/MyButton";
import MyNav from "../../components/main-components/MyNav";
//import Axios from "axios";
function SearchSection(){

  const search = ()=>{  
    // Axios.post("/mysearch",
    //   {withCredentials : true}
    // )
    // .then((response)=>{
    //     console.log(response.data);
    // })
    console.log("search button pressed");
}
return(
            <MySection>
              <MyNav />
              <SearchSectionDiv className="row align-items-center">
                <Ministrybar />
                  <div className="home-text">
                  <h4>Hello ! You are Welcome</h4>
                      <h2><b>Land Search Information System</b></h2>
                      <p> You can easily perfom a search on your land by <br/> entering in your clin number for customary land <br /> entering plot and plot number for mailo land </p>
                      
                  </div>
                  <div className="row align-items-center search">
                    <div className="contact-form">
                            <div className="row">
                                <div className="input-group">
                                    <input type="text" placeholder="enter clin / block and plot number" className="input-control" required />
                                </div>
                                <MyButton placeholder="search" onClick={search} />
                                
                            </div>
                        
                    </div>
                    
                  </div>
                  </SearchSectionDiv>
                  </MySection>
);
}

const SearchSectionDiv = styled.div`
display:flex;
flex-wrap:wrap;
.home-text, .search{
  width : 50%;
  padding:15px;
  }
  .contact-form{
      width:100%;
      height:100%;
      padding:0 15px;
      border-left: 1px dotted var(--white-alpha-40);
  }
  .contact-form .row{
      align-items:center;
      
  }
  .contact-form .input-group{
      width:60%;
      margin-bottom:30px;
  }
  .contact-form .input-control::placeholder{
      color:var(--black-dark);
      opacity:0.8;
      font-weight:300;
  }
  .contact-form .input-control{
      display:block;
      width:100%;
      height:50px;
      border-radius:25px;
      border:none;
      font-family:inherit;
      font-weight:400;
      font-size:16px;
      background-color:var(--white-alpha-25);
      padding:0 20px;
      color:var(--blue-dark);
      border:1px solid transparent;
      transition:border-color 0.3s ease;
  }
  .contact-form .input-control:focus{
      border-color:var(--white-alpha-40);
  }
`;
export default SearchSection;