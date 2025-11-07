import { Button, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router";
import useDynamicTitle from "../hooks/useDynamicTitle";

const Profile = () => {
  const {user, logout} = useAuth();
  const navigation = useNavigate();
  useDynamicTitle(user.username + " | Profile");
  const handleLogout = () => {
    logout();
    navigation('/login');
  }
  return (
    <Container>
      <h2>Welcome!</h2>
      <p>User ID: {user.id}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Gender: {user.gender}</p>
      <p>About: {user.about}</p>
      <p>
        Roles: {user.roles && user.roles.length > 0 ? user.roles.join(", ") : "No roles assigned"}
      </p>
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
    </Container>
  );

}

export default Profile;