import Styled from "styled-components";

function MyTextArea({type, placeholder}){
    return(
        <MyTextAreaStyled>
        <div className="input-group">
         <textarea type={type} placeholder={placeholder} className="input-control" required></textarea>
        </div>
        </MyTextAreaStyled>
    )
}

const MyTextAreaStyled = Styled.div`
.contact-form .input-group{
    width:100%;
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
.contact-form textarea.input-control{
    height:120px;
    resize:none;
    padding-top:15px;
}
`;

export default MyTextArea;