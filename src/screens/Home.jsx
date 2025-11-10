import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import PublicNavbar from "../components/PublicNavbar";
import useDynamicTitle from "../hooks/useDynamicTitle";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ReactPaginate from "react-paginate";
import {
  ArrowRight,
  CalendarEvent,
  ChevronLeft,
  ChevronRight,
  Person,
} from "react-bootstrap-icons";
import { humanizeDate, scrollToTop } from "../util";

const Home = () => {
  useDynamicTitle("Home | BootBlog");
  const [blogs, setBlogs] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [pageNumber, setPageNumber] = useState(0);

  const handlePageChange = (e) => {
    scrollToTop();
    setPageNumber(e.selected);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(
        `${backendUrl}/api/blogs?page=${pageNumber}&sortBy=createdDate&order=desc`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        setBlogs(null);
      }

      const data = await response.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, [pageNumber]);

  return (
    <>
      <PublicNavbar />
      <Container className="py-4">
        <Row className="overflow-hidden position-relative">
          <Col className="">
            <h2 className="mb-4">Latest Blogs</h2>
            <Container fluid>
              <Row>
                {blogs &&
                  blogs.blogs.map((blog) => (
                    <Col
                      lg={4}
                      md={6}
                      xs={12}
                      className="mb-3 d-flex align-items-stretch"
                    >
                      <Card>
                        <Card.Img
                          variant="top"
                          src="https://placehold.co/600x400"
                        />
                        <Card.Body className="d-flex flex-column align-items-strech">
                          <Card.Text className="text-muted d-flex align-items-center">
                            <Person className="me-1" />
                            {blog.author.name} ●{" "}
                            <CalendarEvent className="me-1 ms-2" />
                            {humanizeDate(new Date(blog.createdDate))}
                          </Card.Text>
                          <Card.Title>{blog.title}</Card.Title>
                          <Card.Text className="flex-grow-1">
                            {blog.content.length > 100
                              ? blog.content.substring(0, 100) + "..."
                              : blog.content}
                          </Card.Text>
                          <div className="d-flex justify-content-between align-items-center">
                            <Badge pill bg="success">
                              {blog.category.name}
                            </Badge>
                            <Button
                              variant="outline-primary"
                              className="d-flex align-items-center"
                            >
                              <p className="me-2 mb-0">Read More</p>{" "}
                              <ArrowRight />
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <ReactPaginate
              breakLabel="..."
              previousLabel={<ChevronLeft className="m-0" />}
              nextLabel={<ChevronRight className="m-0" />}
              onPageChange={handlePageChange}
              pageRangeDisplayed={5}
              pageCount={blogs?.totalPages}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Home;
