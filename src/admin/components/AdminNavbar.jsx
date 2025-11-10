import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import useDynamicTitle from '../../hooks/useDynamicTitle';

const AdminNavbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  useDynamicTitle("Admin Panel | BootBlog")

  const navigateToRoute = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    logout();
    navigateToRoute("/login");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-secondary"
      bg="warning"
      variant="light"
      sticky='top'
    >
      <Container>
        <Navbar.Brand onClick={() => navigateToRoute("/admin/dashboard")}>
          Admin Panel | BootBlog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated && isAdmin && (
              <NavDropdown
                align={"end"}
                title={<PersonCircle width={25} height={25} />}
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item onClick={() => navigateToRoute("/profile")}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigateToRoute("/blogs")}>
                  My Blogs
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AdminNavbar