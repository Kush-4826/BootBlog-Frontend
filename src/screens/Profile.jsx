import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import useDynamicTitle from "../hooks/useDynamicTitle";
import PublicNavbar from "../components/PublicNavbar";
import { PencilFill } from "react-bootstrap-icons";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigate();
  useDynamicTitle(user.username + " | Profile");
  const handleLogout = () => {
    logout();
    navigation("/login");
  };
  return (
    <>
      <PublicNavbar />
      <Container fluid>
        <Row className="">
          <Col md={8} className="mx-auto mt-4">
            <Container fluid className="p-4">
              <h2 className="text-center mb-4">Your Profile</h2>
              <Card className="bg-light mb-3">
                <Card.Body className="d-flex flex-column align-items-center">
                  <div
                    className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "100px",
                      height: "100px",
                      fontSize: "36px",
                    }}
                  >
                    {user.username.substring(0, 1).toUpperCase()}
                  </div>
                  <h4 className="text-center">{user.username}</h4>
                  <p className="text-center mb-0">ID: {user.id}</p>
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    className="mt-3"
                  >
                    Logout
                  </Button>
                </Card.Body>
              </Card>
              <Card className="bg-light mb-3">
                <Card.Header>
                  <h3 className="my-3">Profile Details</h3>
                </Card.Header>
                <Card.Body>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        value={user.email}
                        disabled={true}
                        aria-describedby="basic-addon2"
                      />
                      <Button
                        variant="outline-primary"
                        className="d-flex align-items-center"
                        id="button-addon2"
                      >
                        <PencilFill className="me-2" />
                        <p className="d-inline-block mb-0">Edit</p>
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Select
                        disabled={true}
                        aria-describedby="basic-addon2"
                        value={user.gender.toLowerCase()}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                      <Button
                        variant="outline-primary"
                        className="d-flex align-items-center"
                        id="button-addon2"
                      >
                        <PencilFill className="me-2" />
                        <p className="d-inline-block mb-0">Edit</p>
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Role</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        value={user.roles[0]}
                        disabled={true}
                        aria-describedby="basic-addon2"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>About</Form.Label>
                    <InputGroup className="mb-3">
                      <textarea
                        value={user.about}
                        disabled={true}
                        aria-describedby="basic-addon2"
                        className="form-control"
                      />
                    </InputGroup>
                  </Form.Group>
                </Card.Body>
              </Card>
              <Card className="bg-light">
                <Card.Header>
                  <h3 className="my-3">Change Password</h3>
                </Card.Header>
                <Card.Body>
                  <Form.Group>
                    <Form.Label>Current Password</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        disabled={false}
                        placeholder="Enter current password"
                        aria-describedby="basic-addon2"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Enter new password"
                        disabled={false}
                        aria-describedby="basic-addon2"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Cofirm Password</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Confirm new password"
                        disabled={false}
                        aria-describedby="basic-addon2"
                      />
                    </InputGroup>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
