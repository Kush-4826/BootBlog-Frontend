import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import AdminNavbar from "./../components/AdminNavbar";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import { useAuth } from "../../context/AuthContext";
import { capitalizeWords, scrollToTop } from "../../util";
import {
  ChevronLeft,
  ChevronRight,
  PencilFill,
  PersonDown,
  PersonUp,
  Trash2Fill,
} from "react-bootstrap-icons";
import ReactPaginate from "react-paginate";

const AdminUsers = () => {
  useDynamicTitle("Users | BootBlog");

  const { user, isAuthenticated, isAdmin } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const authToken = localStorage.getItem("authToken");

  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(
        `${backendUrl}/api/users?page=${pageNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status == 401) {
        const error = await response.json();

        setError(error.error);
      }

      const data = await response.json();
      setUserData(data);
    };

    if (isAuthenticated && isAdmin) fetchUserData();
  }, [user, pageNumber]);

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
                  userData.users.map((usr) => (
                    <tr key={usr.id} onClick={() => console.log(usr.id)}>
                      <td>{usr.id}</td>
                      <td>{usr.name}</td>
                      <td>{usr.email}</td>
                      <td>{capitalizeWords(usr.gender)}</td>
                      <td>{usr.about && usr.about.substring(0, 20) + "..."}</td>
                      <td>{usr.roles[0]}</td>
                      <td>
                        <ButtonGroup>
                          <OverlayTrigger
                            placement="bottom"
                            overlay={
                              <Tooltip id={`tooltip-edit`}>Edit User</Tooltip>
                            }
                          >
                            <Button variant="outline-warning">
                              <PencilFill />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="bottom"
                            overlay={
                              <Tooltip id={`tooltipdelete`}>
                                Delete User
                              </Tooltip>
                            }
                          >
                            <Button variant="outline-danger">
                              <Trash2Fill />
                            </Button>
                          </OverlayTrigger>
                          {usr.id !== user.id &&
                            (usr.roles[0] === "ADMIN" ? (
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id={`tooltip-demote`}>
                                    Demote User
                                  </Tooltip>
                                }
                              >
                                <Button variant="outline-primary">
                                  <PersonDown />
                                </Button>
                              </OverlayTrigger>
                            ) : (
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id={`tooltip-promote`}>
                                    Promote User
                                  </Tooltip>
                                }
                              >
                                <Button variant="outline-success">
                                  <PersonUp />
                                </Button>
                              </OverlayTrigger>
                            ))}
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <ReactPaginate
              breakLabel="..."
              previousLabel={<ChevronLeft className="m-0" />}
              nextLabel={<ChevronRight className="m-0" />}
              onPageChange={(e) => {
                scrollToTop();
                setPageNumber(e.selected);
              }}
              pageRangeDisplayed={5}
              pageCount={userData?.totalPages}
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
              activeLinkClassName=""
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminUsers;
