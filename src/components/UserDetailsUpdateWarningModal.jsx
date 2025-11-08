import { Exclamation, ExclamationTriangleFill } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const UserDetailsUpdateWarningModal = ({onClose, onConfirm, ...props}) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onBackdropClick={onClose}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <div className="d-flex align-items-center">
          <ExclamationTriangleFill className="me-3 text-warning" width={35} height={35} />
          <p className="d-inline-block mb-0">Warning</p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Updating the profile details will log you out of your account. Are you sure you want to proceed?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="warning" onClick={onConfirm}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailsUpdateWarningModal;
