import Styled,{keyframes,css} from "styled-components";
function MySection({children ,style}){

    return( 
      <CustomBody>
        <CustomSection id="home" className="home-section align-items-center active">
            <div className="mycontainer" style={{...style}}>  
              {children}
              </div>
          </CustomSection>
          </CustomBody>
    );
}
const fadeOut = keyframes`
0%{
    opacity:1;
}
100%{
    opacity:0;
}
`;

const fadein = keyframes`
0%{opacity:0;}
100%{opacity:1;}
`;

const CustomBody = Styled.div`
  min-height :100vh;
  min-width:100vh;
  background: linear-gradient(to bottom right , var(--pink-light), var(--cyan-light));

  background-attachment: fixed;
  &::before , &::after{
    box-sizing:border-box;
  }
  &::before{
    content:'';
    position:fixed;
    left:0;
    top:0;
    height:100%;
    width:100%;
    background-color: var(--green-yellow);
    z-index:-1;
    opacity:0.12;
    font-size:10px;
    color:var(--blue-dark);
    line-height:1.5;
    overflow-x : hidden;
    -webkit-top-highlight-color: transparent;
    padding: 5vh 15px;
  }
  
`;

const CustomSection = Styled.section`
background-color: var(--white-alpha-25);
  border:1px solid var(--white-alpha-40);
  min-height: 100vh;
  border-radius:30px;
  backdrop-filter: var(--backdrop-filter-blur);
  min-height:calc(100vh - 70px);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:50px 0;
  margin:0 5%;
  ${props => props.className.includes("active") && css`
  display:block;
  animation:${fadein} 0.5s ease-in-out forwards;`}
  ${props => props.className.includes("fade-out") && css `
  animation:${fadeOut} 0.5s ease-in-out forwards;`}
  .mycontainer{
    width:100%;
     padding:0 40px;
   }
`;


export default MySection;

