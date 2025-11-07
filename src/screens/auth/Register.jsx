import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    gender: "male",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleUsernameChange = (e) => {
    setErrors((prev) => ({ ...prev, username: "" }));
    setFormData((prev) => ({ ...prev, username: e.target.value }));
  };

  const handleEmailChange = (e) => {
    setErrors((prev) => ({ ...prev, email: "" }));
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setErrors((prev) => ({ ...prev, password: "" }));
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleConfirmPasswordChange = (e) => {
    setErrors((prev) => ({ ...prev, password_confirmation: "" }));
    setFormData((prev) => ({ ...prev, password_confirmation: e.target.value }));
  };

  const handleGenderChange = (e) => {
    setFormData((prev) => ({ ...prev, gender: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.username.length == 0) {
      setErrors((prev) => ({ ...prev, username: "Username is required" }));
    }
    if (formData.password.length == 0) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
    }
    if (formData.email.length == 0) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    }
    if (formData.password_confirmation.length == 0) {
      setErrors((prev) => ({ ...prev, password_confirmation: "Confirm your password" }));
    } else if (formData.password_confirmation != formData.password) {
      setErrors((prev) => ({ ...prev, password_confirmation: "Passwords do not match" }));
    }

    // TODO: Handle Submission Logic
    console.log(formData);
  };

  return (
    <Container className="d-flex p-4 flex-column vh-100 justify-content-center">
      <Row className="mb-4">
        <h2 className="text-center">Create a New Account</h2>
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
                    onChange={handleUsernameChange}
                  />
                  {errors.username.length != 0 && (
                    <label
                      className="text-danger d-block"
                      style={{ fontSize: "0.75em" }}
                    >
                      {errors.username}
                    </label>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="john@example.com"
                    onChange={handleEmailChange}
                  />
                  {errors.email.length != 0 && (
                    <label
                      className="text-danger d-block"
                      style={{ fontSize: "0.75em" }}
                    >
                      {errors.email}
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
                    <label
                      className="text-danger d-block"
                      style={{ fontSize: "0.75em" }}
                    >
                      {errors.password}
                    </label>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="password_confirmation">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleConfirmPasswordChange}
                  />
                  {errors.password_confirmation.length != 0 && (
                    <label
                      className="text-danger d-block"
                      style={{ fontSize: "0.75em" }}
                    >
                      {errors.password_confirmation}
                    </label>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select onChange={handleGenderChange} defaultValue={"male"}>
                    <option value={"male"}>Male</option>
                    <option value={"female"}>Female</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <p className="m-0">
                  Already have an account? &nbsp;
                  <Card.Link href="#">Login</Card.Link>
                </p>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Card.Footer>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
