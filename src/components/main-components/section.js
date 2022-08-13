import Styled,{keyframes,css} from "styled-components";
function MySection({children ,style}){

    return( 
        <CustomSection id="home" className="home-section align-items-center active">
            <div className="mycontainer" style={{...style}}>  
              {children}
              </div>
          </CustomSection>
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


const CustomSection = Styled.section`
background-color: var(--white-alpha-25);
  border:1px solid var(--white-alpha-40);
  min-height: 90vh;
  border-radius:30px;
  backdrop-filter: var(--backdrop-filter-blur);
  min-height:calc(100vh - 70px);
  ${props => props.className.includes("active") && css`
  display:block;
  animation:${fadein} 0.5s ease-in-out forwards;`}
  ${props => props.className.includes("fade-out") && css `
  animation:${fadeOut} 0.5s ease-in-out forwards;`}
  align-items:center;
    display:flex;
   padding:120px 0;
  }
  
  .mycontainer{
    width:100%;
     padding:0 40px;
   }
`;

export default MySection;

