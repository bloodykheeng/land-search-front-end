import Styled from "styled-components";

function MyButton({type, active, placeholder, ...other}){
    return(
        <MyButtonStyled active={active}>
        <div className="submit-btn">
         <button type={type} {...other} className="btn">
            <span>{placeholder}</span>      
        </button>
        </div>
        </MyButtonStyled>
    )
}

const MyButtonStyled = Styled.div`
.btn{
    line-height:1.5;
    background-color:${({active})=>active ? "var(--main-color)" : "(var(--white-alpha-25))" };
    padding:10px 28px;
    display:inline-block;
    border-radius:30px;
    color:${({active})=> active ? "var(--white)" : "var(--main-color)" };
    font-weight:500;
    text-transform:capitalize;
    border:1px solid var(--white-alpha-40);
    font-family:inherit;
    font-size:16px;
    cursor:pointer;
    user-select: none;
    position: relative;
    overflow:hidden;
    vertical-align:middle;
    transition: color 0.3s ease;
    display:flex;
    align-items:center;
    justify-content:center;
    text-decoration:none;
    font-weight:bold;
}

.btn::before{
    content:'';
    position:absolute;
    left:0;
    top:0;
    height:100%;
    width:0%;
    background-color:var(--main-color);
    transition: width 0.3s ease;
}
.btn:hover::before{
width:100%;
}

.btn:hover{
    color:var(--white);
}
.btn span{
    z-index:2;
}
`;

export default MyButton;