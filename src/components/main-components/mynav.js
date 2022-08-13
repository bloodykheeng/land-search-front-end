import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {colors} from "../colors";
import {Link} from "react-router-dom";
import styled from 'styled-components';


function MyNav(){
    const expand= false;
    return(
    <Navbar key={expand} bg={colors.white_alpha_25} expand={expand} className="mb-3">
          <Container fluid bg={colors.white_alpha_25} >
            <Navbar.Brand href="#">Ministry Of Lands Housing And Urban Development</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}  />
            <Navbar.Offcanvas 
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end" 
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Ministry Of Lands Housing And Urban Development
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body bg={colors.white_alpha_25} >
                <Nav className="justify-content-center flex-grow-1 pe-3">
                  
                  <Nav.Link><MySpan><Link to="/" className="mylink">home</Link></MySpan></Nav.Link>
                  
                  <Nav.Link><MySpan><Link to="/search"  className="mylink">search</Link></MySpan></Nav.Link>
                  
                  <Nav.Link><MySpan><Link to="/adminhome"  className="mylink">admin</Link></MySpan></Nav.Link>
                  
                  <Nav.Link><MySpan><Link to="/adminupload"  className="mylink">upload</Link></MySpan></Nav.Link>
                  
                  
                  
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        )
    }

    export default MyNav;

const MySpan = styled.div`

  .mylink{
    justify-content:center;
    text-decoration:none;
   font-size:25px;
   text-transform: capitalize;
   color:var(--black-dark);
   display:block;
   font-weight:400;
   padding:2px 100px;
   transition: color 0.3s ease;
   position: relative;
 }
 &:hover{
    color:var(--main-color);
    color:green;
  
`;




