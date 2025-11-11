import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import PublicNavbar from "../components/PublicNavbar";
import { Button, Col, Container, Row } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import useDynamicTitle from "../hooks/useDynamicTitle";

const UserBlogs = () => {
  const { isAuthenticated, user } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(null);

  useDynamicTitle("My Blogs | BootBlog");

  useEffect(() => {
    const fetchBlogs = async () => {
      const userId = user.id;
      const authToken = localStorage.getItem("authToken");

      const response = await fetch(`${backendUrl}/api/users/${userId}/blogs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBlogs(data);
      }
    };

    fetchBlogs();
  }, [user]);

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
  }

  return (
    <>
      <PublicNavbar />
      <Container className="py-4">
        <Row>
          <Col xs={6} md={8}>
            <h2 className="mb-0">My Blogs</h2>
          </Col>
          <Col xs={6} md={4} className="d-flex justify-content-end align-items-center">
            <Button variant="outline-success" className="d-flex align-items-center px-sm-3 px-2 py-2"><PlusLg width={20} height={20} />
            <p className="ms-1 mb-0 d-none d-sm-block">Create a Blog</p>
            </Button>
          </Col>
        </Row>
        {blogs && blogs.length !== 0 ? JSON.stringify(blogs) : <p>You don't have any blogs yet!</p>}
      </Container>
    </>
  );
};

export default UserBlogs;
