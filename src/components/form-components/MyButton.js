import Styled from "styled-components";

function MyButton({type, placeholder, ...other}){
    return(
        <MyButtonStyled>
        <div className="submit-btn">
         <button type={type} {...other} className="btn">{placeholder} </button>
        </div>
        </MyButtonStyled>
    )
}

const MyButtonStyled = Styled.div`
.btn{
    line-height:1.5;
    background-color:(var(--white-alpha-25));
    padding:10px 28px;
    display:inline-block;
    border-radius:30px;
    color:var(--main-color);
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
}

.btn::before{
    content:'';
    position:absolute;
    left:0;
    top:0;
    height:100%;
    width:0%;
    background-color:var(--main-color);
    z-index:-1;
    transition: width 0.3s ease;
}
.btn:hover::before{
width:100%;
}
.btn:hover{
    color:var(--white);
}
`;

export default MyButton;