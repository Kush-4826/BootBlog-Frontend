import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router';

const PublicNavbar = () => {
  
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const navigateToRoute = (route) => {
    navigate(route);
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-secondary" bg='info' variant='light'>
      <Container>
        <Navbar.Brand href="#home">BootBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <Nav.Link onClick={() => navigateToRoute("/profile")}>Profile</Nav.Link>
            ) : (
              <>
              <Nav.Link onClick={() => navigateToRoute("/login")}>Login</Nav.Link>
              <Nav.Link onClick={() => navigateToRoute("/register")}>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNavbar;