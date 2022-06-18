import React from "react";
import { Form, FloatingLabel, Button, Modal, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  password: Yup.string()
    .max(8, "Must be 8 characters or less")
    .required("Required"),
  // email: Yup.string().email("Invalid email address").required("Required"),
});

function LoginForm(props) {
  const { setShowLogin } = props;
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={console.log}
          initialValues={{
            name: "",
            password: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form className="mb-3" noValidate onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.name}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  isInvalid={!!errors.password}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          )}
        </Formik>
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
