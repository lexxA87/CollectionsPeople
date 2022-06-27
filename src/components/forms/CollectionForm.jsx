import React from "react";
import { Button, Modal } from "react-bootstrap";

function CollectionForm({ show, setShow, collection }) {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CollectionForm</Modal.Title>
        </Modal.Header>
        <Modal.Body>{JSON.stringify(collection, null, 2)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CollectionForm;
