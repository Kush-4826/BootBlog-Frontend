import { Col, Container, Row } from "react-bootstrap";
import PublicNavbar from "../components/PublicNavbar";
import useDynamicTitle from "../hooks/useDynamicTitle";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  useDynamicTitle("Home | BootBlog");
  const [blogs, setBlogs] = useState(null);
  const {user, isAuthenticated} = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`${backendUrl}/api/blogs?page=${0}`, {
        method: "GET"
      });

      if(!response.ok) {
        setBlogs(null);
      }

      const data = await response.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <PublicNavbar />
      <Container className="py-4">
        <Row className="overflow-hidden position-relative">
          <Col className="">
            <h2>Latest Blogs</h2>
            <p>{JSON.stringify(blogs)}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Home;
