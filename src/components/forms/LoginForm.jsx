import React from "react";
import { Form, FloatingLabel, Button, Modal, Alert } from "react-bootstrap";

function LoginForm(props) {
  const { setShowLogin } = props;
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mb-3">
          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="mb-3"
          >
            <Form.Control />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control type="password" />
          </FloatingLabel>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <Alert variant="light">
          Or go to{" "}
          <Alert.Link onClick={() => setShowLogin(false)}>
            Registration
          </Alert.Link>
        </Alert>
      </Modal.Body>
    </>
  );
}

export default LoginForm;
