import Styled from "styled-components";
import {motion} from "framer-motion";
function MySection({children ,style}){

    return( 
      <CustomBody>
        <CustomSection as={motion.section} 
        initial ={{width:0}}
        animate={{width : "90vw"}}
         exit={{x:window.innerWidth , transition : {duration : 0.3}}}
         id="home" 
         className="home-section align-items-center active">
            <div className="mycontainer" style={{...style}}>  
              {children}
              </div>
          </CustomSection>
          </CustomBody>
    );
}

// animate={{opacity:1}}
//  exit={{opacity:0}}
// const fadeOut = keyframes`
// 0%{
//     opacity:1;
// }
// 100%{
//     opacity:0;
// }
// `;

// const fadein = keyframes`
// 0%{opacity:0;}
// 100%{opacity:1;}
// `;
// ${props => props.className.includes("active") && css`
//   display:block;
//   animation:${fadein} 0.5s ease-in-out forwards;`}
//   ${props => props.className.includes("fade-out") && css `
//   animation:${fadeOut} 0.5s ease-in-out forwards;`}

const CustomBody = Styled.div`
  width:100%;
  min-height:100%;
  background: linear-gradient(to bottom right , var(--pink-light), var(--cyan-light));
  padding:20px;
  overflow : hidden;
  background-attachment: fixed;
  &::before , &::after{
    box-sizing:border-box;
    overflow : hidden;
  }
  &::before{
    content:'';
    position:fixed;
    left:0;
    top:0;
    min-height:100%;
    min-width:100%;
    background-color: var(--green-yellow);
    z-index:-1;
    opacity:0.12;
    font-size:10px;
    color:var(--blue-dark);
    line-height:1.5;
    -webkit-top-highlight-color: transparent;
    padding: 5px 15px;
  }
  
`;

const CustomSection = Styled.section`
background-color: var(--white-alpha-25);
  border:1px solid var(--white-alpha-40);
  border-radius:30px;
  backdrop-filter: var(--backdrop-filter-blur);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:50px 0;
  margin:0 5%;
  overflow : hidden;
  .mycontainer{
    width:100%;
     padding:0 40px;
     overflow : hidden;
   }
`;


export default MySection;

