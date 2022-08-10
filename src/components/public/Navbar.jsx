

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function NavbarComponent(){
  return (
    <>  
        <Navbar bg="light" expand='lg' className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">
            <img
              alt=""
              src="/imagens/wc_logo_menu-fixo.png"
              width="300em"
              height="auto"
              className="d-inline-block align-top"
            />{' '}
                </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-5">
                  <Nav.Link href="#action1">Link</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Perfil"
                    id={`offcanvasNavbarDropdown-expand-lg`}
                  >
                    <NavDropdown.Item href="#action3">Item 1</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Item 2</NavDropdown.Item>
                   
                  </NavDropdown>
                </Nav>
                <Nav>
            <Nav.Link></Nav.Link>
            <Nav.Link ></Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              
            </Nav.Link>
          </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>   
    </>
  );
}

