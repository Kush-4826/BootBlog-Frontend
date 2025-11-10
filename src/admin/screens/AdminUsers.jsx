import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import AdminNavbar from "./../components/AdminNavbar";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import { useAuth } from "../../context/AuthContext";

const AdminUsers = () => {
  useDynamicTitle("Users | BootBlog");

  const { user, isAuthenticated, isAdmin } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const authToken = localStorage.getItem("authToken");

  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`${backendUrl}/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status == 401) {
        const error = await response.json();

        setError(error.error);
      }

      const data = await response.json();
      setUserData(data);
    };

    if (isAuthenticated && isAdmin) fetchUserData();
  }, [user]);

  return (
    <>
      <AdminNavbar />
      <Container className="py-4">
        <Row>
          <Col>
            <h2>Users</h2>
            <Table striped responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>About</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData &&
                  userData.map((usr) => (
                    <tr key={usr.id} onClick={() => console.log(usr.id)}>
                      <td>{usr.id}</td>
                      <td>{usr.name}</td>
                      <td>{usr.email}</td>
                      <td>{usr.gender}</td>
                      <td>
                        {usr.about && usr.about.substring(0, 20) + "..."}
                      </td>
                      <td>{usr.roles[0]}</td>
                      <td></td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminUsers;
