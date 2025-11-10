import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import { PersonCircle } from "react-bootstrap-icons";

const PublicNavbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

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
      bg="info"
      variant="light"
    >
      <Container>
        <Navbar.Brand onClick={() => navigateToRoute("/")}>
          BootBlog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Nav>
            {isAuthenticated ? (
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
                {isAdmin && (
                  <NavDropdown.Item
                    onClick={() => navigateToRoute("/admin/dashboard")}
                  >
                    Admin Panel
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // <Nav.Link onClick={() => navigateToRoute("/profile")}>Profile</Nav.Link>
              <>
                <Nav.Link onClick={() => navigateToRoute("/login")}>
                  Login
                </Nav.Link>
                <Nav.Link onClick={() => navigateToRoute("/register")}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNavbar;
