import Styled from "styled-components";

function MyInput({type, placeholder, ...other}){
    return(
        <MyInputStyled>
        <div className="input-group">
         <input type={type} {...other} placeholder={placeholder} className="input-control" required />
        </div>
        </MyInputStyled>
    )
}

const MyInputStyled = Styled.div`
.input-group{
    max-width:100%;
    margin:15px 15px;
}
 .input-control::placeholder{
    color:var(--black-dark);
    opacity:1;
    font-weight:500;
}
.input-control{
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
    border:3px solid transparent;
    transition:border-color 0.3s ease;
}
 .input-control:focus{
    border-color:var(--white-alpha-40);
}
`;

export default MyInput;