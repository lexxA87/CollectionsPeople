import React from "react";
import { Button, Card } from "react-bootstrap";

function CollectionForm({ setShow, collection }) {
  const handleClose = () => setShow(false);
  return (
    <>
      <Card>
        <Card.Header as="h5">CollectionForm</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>{JSON.stringify(collection, null, 2)}</Card.Text>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default CollectionForm;
