import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";
import useDynamicTitle from "../../hooks/useDynamicTitle";

function Register() {
  useDynamicTitle("Register | BootBlog");
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isAuthenticated, register, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

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

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    };

    // Username validation
    if (formData.username.length === 0) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    // Email validation
    if (formData.email.length === 0) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (formData.password.length === 0) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Password confirmation validation
    if (formData.password_confirmation.length === 0) {
      newErrors.password_confirmation = "Please confirm your password";
      isValid = false;
    } else if (formData.password_confirmation !== formData.password) {
      newErrors.password_confirmation = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent multiple submissions
    if (isSubmitting) return;

    try {
      console.log("Form submitted");

      // Clear previous errors
      setErrors({
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      });

      // Validate form
      if (!validateForm()) {
        console.log("Validation failed");
        return;
      }

      setIsSubmitting(true);

      // Call register function
      const result = await register(
        formData.username,
        formData.password,
        formData.email,
        formData.gender
      );

      console.log("Register result:", result);

      if (result && result.success) {
        // Registration successful - navigate to home or dashboard
        navigate(from, { replace: true });
      } else if (result.validationErrors) {
        // Handle 422 validation errors from server
        console.log("Server validation errors:", result.validationErrors);
        
        const newErrors = {
          username: result.validationErrors.username || "",
          email: result.validationErrors.email || "",
          password: result.validationErrors.password || "",
          password_confirmation: result.validationErrors.password_confirmation || "",
        };
        
        setErrors(newErrors);
      } else {
        // Handle other errors
        const errorMessage = result?.error || error?.error || "Registration failed. Please try again.";
        console.log("Setting error message:", errorMessage);

        // Show generic error on username field
        setErrors({ 
          username: errorMessage,
          email: "",
          password: "",
          password_confirmation: ""
        });
      }
    } catch (err) {
      console.error("Form error:", err);
      setErrors({ 
        username: "An unexpected error occurred",
        email: "",
        password: "",
        password_confirmation: ""
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="d-flex p-4 flex-column vh-100 justify-content-center">
      <Row className="mb-4">
        <h2 className="text-center">Create a New Account</h2>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col sm={12} md={8} lg={6}>
          <Card>
            <Form onSubmit={handleFormSubmit} noValidate>
              <Card.Body>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleUsernameChange}
                    isInvalid={errors.username.length !== 0}
                    disabled={isSubmitting}
                  />
                  {errors.username.length !== 0 && (
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="john@example.com"
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
                    placeholder="Password"
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

                <Form.Group className="mb-3" controlId="password_confirmation">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.password_confirmation}
                    onChange={handleConfirmPasswordChange}
                    isInvalid={errors.password_confirmation.length !== 0}
                    disabled={isSubmitting}
                  />
                  {errors.password_confirmation.length !== 0 && (
                    <Form.Control.Feedback type="invalid">
                      {errors.password_confirmation}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select 
                    onChange={handleGenderChange} 
                    value={formData.gender}
                    disabled={isSubmitting}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>

              <Card.Footer className="d-flex justify-content-between align-items-center">
                <p className="m-0">
                  Already have an account? &nbsp;
                  <Link to="/login">Login</Link>
                </p>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Account..." : "Register"}
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
