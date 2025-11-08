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
import { Floppy2Fill, PencilFill } from "react-bootstrap-icons";
import { useState } from "react";

const Profile = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { user, logout } = useAuth();

  const [isProfileFormEnabled, setIsProfileFormEnabled] = useState(false);

  const [profileFormErrors, setProfileFormErrors] = useState({
    email: "",
    gender: "",
    about: "",
  });

  const [updateProfileFormData, setUpdateProfileFormData] = useState({
    email: user.email,
    gender: user.gender.toLowerCase(),
    about: user.about ?? "",
  });

  const navigation = useNavigate();

  useDynamicTitle(user.username + " | Profile");

  const handleLogout = () => {
    logout();
    navigation("/login");
  };

  const validateProfileForm = () => {
    // Implement form validation logic here
    let isValid = true;
    const newErrors = {
      email: "",
      gender: "",
      about: "",
    };

    if (updateProfileFormData.email.length === 0) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateProfileFormData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    setProfileFormErrors(newErrors);
    return isValid;
  };

  const handleProfileEditToggle = async (e) => {
    e.preventDefault();
    if (isProfileFormEnabled) {
      setProfileFormErrors({ email: "", gender: "", about: "" });

      if (!validateProfileForm()) {
        return;
      }

      // Implement profile update logic here
      const response = await fetch(`${backendURL}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(updateProfileFormData),
      });

      if (response.status === 422) {
        const data = await response.json();
        const newErrors = {
          email: data.errors.email ?? "",
          gender: data.errors.gender ?? "",
          about: data.errors.about ?? "",
        };
        setProfileFormErrors(newErrors);
        return;
      }

      if (!response.ok) {
        console.error("Failed to update profile");
        setIsProfileFormEnabled(false);
        return;
      }

      const data = await response.json();
      setUpdateProfileFormData(prevState => ({
        ...prevState,
        email: data.email,
        gender: data.gender,
        about: data.about,
      }));
    }
    setIsProfileFormEnabled(!isProfileFormEnabled);
  };

  const handlePassordChange = (e) => {
    e.preventDefault();
    // Implement password change logic here
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
                        value={updateProfileFormData.email}
                        disabled={!isProfileFormEnabled}
                        aria-describedby="basic-addon2"
                        onChange={(e) => {
                          setProfileFormErrors((prevState) => ({
                            ...prevState,
                            email: "",
                          }));

                          setUpdateProfileFormData((prevState) => ({
                            ...prevState,
                            email: e.target.value,
                          }));
                        }}
                        isInvalid={profileFormErrors.email.length != 0}
                      />
                      {profileFormErrors.email.length != 0 && (
                        <Form.Control.Feedback type="invalid">
                          {profileFormErrors.email}
                        </Form.Control.Feedback>
                      )}
                    </InputGroup>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Select
                        disabled={!isProfileFormEnabled}
                        aria-describedby="basic-addon2"
                        value={updateProfileFormData.gender}
                        onChange={(e) => {
                          setUpdateProfileFormData((prevState) => ({
                            ...prevState,
                            gender: e.target.value,
                          }));
                        }}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
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
                        value={updateProfileFormData.about}
                        disabled={!isProfileFormEnabled}
                        aria-describedby="basic-addon2"
                        className="form-control"
                        onChange={(e) => {
                          setUpdateProfileFormData((prevState) => ({
                            ...prevState,
                            about: e.target.value,
                          }));
                        }}
                      />
                    </InputGroup>
                  </Form.Group>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                  <Button
                    variant={isProfileFormEnabled ? "success" : "primary"}
                    className="d-flex align-items-center"
                    id="button-addon2"
                    onClick={handleProfileEditToggle}
                  >
                    {isProfileFormEnabled ? (
                      <>
                        <Floppy2Fill className="me-2" />
                        <p className="d-inline-block mb-0">Save Changes</p>
                      </>
                    ) : (
                      <>
                        <PencilFill className="me-2" />
                        <p className="d-inline-block mb-0">Edit</p>
                      </>
                    )}
                  </Button>
                </Card.Footer>
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
                <Card.Footer className="d-flex justify-content-end">
                  <Button
                    variant="success"
                    className="d-flex align-items-center"
                    id="button-addon2"
                    onClick={handlePassordChange}
                  >
                    <Floppy2Fill className="me-2" />
                    <p className="d-inline-block mb-0">Change Password</p>
                  </Button>
                </Card.Footer>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
