import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router";

const Profile = () => {
  const {user, logout} = useAuth();
  const navigation = useNavigate();
  const handleLogout = () => {
    logout();
    navigation('/login');
  }
  return (
    <>
      <div>Welcome, {user?.username}!</div>
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
    </>
  );

}

export default Profile;