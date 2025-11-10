import { Container } from "react-bootstrap";
import AdminNavbar from "../components/AdminNavbar";

const Dashboard = () => {
  return (
    <>
      <AdminNavbar />
      <Container fluid={true}>
        <div>Dashboard</div>
      </Container>
    </>
  );
};

export default Dashboard;
