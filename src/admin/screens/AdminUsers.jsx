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
  PersonFillDown,
  PersonFillUp,
  PersonUp,
  Trash2Fill,
  TrashFill,
} from "react-bootstrap-icons";
import ReactPaginate from "react-paginate";
import ConfirmationModal from "../components/ConfirmationModal";

const AdminUsers = () => {
  useDynamicTitle("Users | BootBlog");

  const { user, isAuthenticated, isAdmin } = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const authToken = localStorage.getItem("authToken");

  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [modalDeatils, setModalDetails] = useState({
    show: false,
    onConfirm: () => {},
    onClose: () => {},
    title: "",
    message: "",
    confirmButtonText: "Confirm",
    confirmButtonVariant: "warning",
  });

  const fetchUserData = async () => {
    const response = await fetch(`${backendUrl}/api/users?page=${pageNumber}`, {
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

  useEffect(() => {
    if (isAuthenticated && isAdmin) fetchUserData();
  }, [user, pageNumber]);

  const onCloseModal = () => {
    setModalDetails((prevState) => ({
      show: false,
      onConfirm: () => {},
      onClose: () => {},
      title: "",
      message: "",
      confirmButtonText: "Confirm",
      confirmButtonVariant: "warning",
    }));
  };

  const handleDeleteUser = (userId) => {
    const deleteUser = async () => {
      const response = await fetch(`${backendUrl}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const newModalDetails = {
          show: true,
          onConfirm: onCloseModal,
          onClose: onCloseModal,
          title: "Error",
          message: "We encountered an error while deleting the user!",
          confirmButtonText: "OK",
          confirmButtonVariant: "danger",
        };

        setModalDetails((prevState) => newModalDetails);
        return;
      }
      fetchUserData();
      onCloseModal();
    };

    const newModalDetails = {
      show: true,
      onConfirm: deleteUser,
      onClose: onCloseModal,
      title: "Are You Sure?",
      message:
        "Are you sure you want to delete this user? All the blogs created by this user will get deleted...",
      confirmButtonText: "Yes, Delete",
      confirmButtonVariant: "danger",
    };

    setModalDetails((prevState) => newModalDetails);
  };

  const handlePromoteUser = (userId) => {
    const promoteUser = async () => {
      const response = await fetch(
        `${backendUrl}/api/users/${userId}/promote`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const newModalDetails = {
          show: true,
          onConfirm: onCloseModal,
          onClose: onCloseModal,
          title: "Error",
          message: "We encountered an error while Promoting the user to ADMIN!",
          confirmButtonText: "OK",
          confirmButtonVariant: "primary",
        };

        setModalDetails((prevState) => newModalDetails);
        return;
      }

      fetchUserData();
      onCloseModal();
    };

    const newModalDetails = {
      show: true,
      onConfirm: promoteUser,
      onClose: onCloseModal,
      title: "Are You Sure?",
      message:
        "Are you sure you want to promote this user to <strong>ADMIN</strong>?",
      confirmButtonText: "Yes, Promote",
      confirmButtonVariant: "success",
    };

    setModalDetails((prevState) => newModalDetails);
  };

  const handleDemoteUser = (userId) => {
    const demoteUser = async () => {
      const response = await fetch(`${backendUrl}/api/users/${userId}/demote`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const newModalDetails = {
          show: true,
          onConfirm: onCloseModal,
          onClose: onCloseModal,
          title: "Error",
          message: "We encountered an error while Demoting the user to AUTHOR!",
          confirmButtonText: "OK",
          confirmButtonVariant: "primary",
        };

        setModalDetails((prevState) => newModalDetails);
        return;
      }

      fetchUserData();
      onCloseModal();
    };

    const newModalDetails = {
      show: true,
      onConfirm: demoteUser,
      onClose: onCloseModal,
      title: "Are You Sure?",
      message:
        "Are you sure you want to demote this user to <strong>AUTHOR</strong>?",
      confirmButtonText: "Yes, Demote",
      confirmButtonVariant: "warning",
    };

    setModalDetails((prevState) => newModalDetails);
  };

  return (
    <>
      <ConfirmationModal {...modalDeatils} />
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
                    <tr key={usr.id}>
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
                              <Tooltip id={`tooltipdelete`}>
                                Delete User
                              </Tooltip>
                            }
                          >
                            <Button
                              variant="outline-danger"
                              onClick={() => handleDeleteUser(usr.id)}
                            >
                              <TrashFill width={20} height={20} />
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
                                <Button
                                  variant="outline-primary"
                                  onClick={() => handleDemoteUser(usr.id)}
                                >
                                  <PersonFillDown width={20} height={20} />
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
                                <Button
                                  variant="outline-success"
                                  onClick={() => handlePromoteUser(usr.id)}
                                >
                                  <PersonFillUp width={20} height={20} />
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
        <Row className="mt-3">
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
