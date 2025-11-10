import { useEffect, useState } from "react";
import { Container, Row, Card, Col, Button, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import useDynamicTitle from "../../hooks/useDynamicTitle";

function Login() {
  useDynamicTitle("Login | BootBlog");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthenticated, login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleEmailChange = (e) => {
    setErrors((prev) => ({ ...prev, email: "" }));
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setErrors((prev) => ({ ...prev, password: "" }));
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent multiple submissions
    if (isSubmitting) return;

    try {
      console.log("Form submitted");

      // Clear previous errors
      setErrors({ email: "", password: "" });

      // Validation
      if (formData.email.length === 0 || formData.password.length === 0) {
        let errorObject = {};
        if (formData.email.length === 0) {
          errorObject = { ...errorObject, email: "Email is required" };
        }
        if (formData.password.length === 0) {
          errorObject = { ...errorObject, password: "Password is required" };
        }
        setErrors(errorObject);
        return;
      }

      setIsSubmitting(true);

      // Call login
      const result = await login(formData.email, formData.password);

      console.log("Login result:", result);

      if (result && result.success) {
        navigate(from, { replace: true });
      } else if (result.validationErrors) {
        // Handle 422 validation errors from server
        console.log("Server validation errors:", result.validationErrors);
        
        const newErrors = {
          email: result.validationErrors.email || "",
          password: result.validationErrors.password || "",
        };
        
        setErrors(newErrors);
      } else {
        // Handle other errors (401, etc.)
        const errorMessage = result?.error || error?.error || "Login failed. Please try again.";
        console.log("Setting error message:", errorMessage);

        setErrors({
          email: errorMessage,
          password: ""
        });
      }
    } catch (err) {
      console.error("Form error:", err);
      setErrors({
        email: "An unexpected error occurred",
        password: ""
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="d-flex p-4 flex-column vh-100 justify-content-center">
      <Row className="mb-4">
        <h2 className="text-center">Login to BootBlog</h2>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col sm={12} md={8} lg={6}>
          <Card>
            <Form onSubmit={handleFormSubmit} noValidate>
              <Card.Body>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    isInvalid={errors.email.length !== 0}
                    disabled={isSubmitting}
                  />
                  {errors.email.length !== 0 && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    isInvalid={errors.password.length !== 0}
                    disabled={isSubmitting}
                  />
                  {errors.password.length !== 0 && (
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <p className="m-0">
                  Don't have an account? &nbsp;
                  <Link to="/register">Register</Link>
                </p>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
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
