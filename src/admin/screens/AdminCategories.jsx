import React from "react";
import ConfirmationModal from "../components/ConfirmationModal";
import AdminNavbar from "../components/AdminNavbar";
import { Col, Container, Row } from "react-bootstrap";

const AdminCategories = () => {
  return (
    <>
      {/* <ConfirmationModal {...modalDeatils} /> */}
      <AdminNavbar />
      <Container className="py-4">
        <Row>
          <Col>
            <h2>Categories</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminCategories;
