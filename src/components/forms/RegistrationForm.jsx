import React from "react";
import { Form, FloatingLabel, Button, Modal } from "react-bootstrap";

function RegistrationForm(props) {
  const { setShowLogin } = props;
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <Form className="mb-3">
          <FloatingLabel controlId="nameInput" label="Name" className="mb-3">
            <Form.Control />
          </FloatingLabel>

          <FloatingLabel
            controlId="emailInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" />
          </FloatingLabel>
          <FloatingLabel
            controlId="passwordInput"
            label="Password"
            className="mb-3"
          >
            <Form.Control type="password" />
          </FloatingLabel>
          <Button variant="primary" type="submit">
            Registration
          </Button>
        </Form>
        OR
        <Button onClick={() => setShowLogin(true)}>To Login</Button>
      </Modal.Body>
    </>
  );
}

export default RegistrationForm;
