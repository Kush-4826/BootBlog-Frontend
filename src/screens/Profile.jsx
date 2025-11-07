import { Button } from "react-bootstrap";
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
    <>
      <div>Welcome, {user?.username}!</div>
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
    </>
  );

}

export default Profile;