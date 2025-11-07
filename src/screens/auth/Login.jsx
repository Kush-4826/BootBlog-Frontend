import { useState } from "react";
import { Container, Row, Card, Col, Button, Form } from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleEmailChange = (e) => {
    setErrors((prev) => ({ ...prev, username: "" }));
    setFormData((prev) => ({ ...prev, username: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setErrors((prev) => ({ ...prev, password: "" }));
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.username.length == 0) {
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
    }
    if (formData.password.length == 0) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
    }

    // TODO: Handle Submission Logic
    console.log(formData);    
  };

  return (
    <Container className="d-flex p-4 flex-column vh-100 justify-content-center">
      <Row className="mb-4">
        <h2 className="text-center">Login to BootBlog</h2>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col sm={12} md={8} lg={6}>
          <Card>
            {/* <Card.Header className="text-center">Login to BootBlog to Continue</Card.Header> */}
            <Form onSubmit={handleFormSubmit}>
              <Card.Body>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="johndoe"
                    onChange={handleEmailChange}
                  />
                  {errors.username.length != 0 && (
                    <label className="text-danger d-block" style={{ fontSize: "0.75em" }}>
                      {errors.username}
                    </label>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                  />
                  {errors.password.length != 0 && (
                    <label className="text-danger d-block" style={{ fontSize: "0.75em" }}>
                      {errors.password}
                    </label>
                  )}
                </Form.Group>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <p className="m-0">
                  Don't have an account? &nbsp;
                  <Card.Link href="#">Register</Card.Link>
                </p>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Card.Footer>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
