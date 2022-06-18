import React from "react";
import { Form, FloatingLabel, Button, Modal } from "react-bootstrap";

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
        OR
        <Button onClick={() => setShowLogin(false)}>To Registration</Button>
      </Modal.Body>
    </>
  );
}

export default LoginForm;
