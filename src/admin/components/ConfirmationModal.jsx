import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { ExclamationTriangleFill } from 'react-bootstrap-icons'

const ConfirmationModal = ({title, message, onConfirm, confirmButtonText, confirmButtonVariant, onClose, ...props}) => {
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
          <p className="d-inline-block mb-0">{title}</p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p dangerouslySetInnerHTML={{ __html: message }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant={confirmButtonVariant} onClick={onConfirm}>
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal