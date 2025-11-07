import { Col, Container, Row } from "react-bootstrap";
import PublicNavbar from "../components/PublicNavbar";
import useDynamicTitle from "../hooks/useDynamicTitle";

const Home = () => {
  useDynamicTitle("Home | BootBlog");
  return (
    <>
      <PublicNavbar />
      <Container className="mt-4">
        <Row>
          <Col>
            <h2>Home Page</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Home;
