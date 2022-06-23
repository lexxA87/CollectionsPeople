import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, FloatingLabel, Button, Modal, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { userRegistration } from "../../api/userAPI";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(60, "Must be 60 characters or less")
    .required("Required"),
  password: Yup.string()
    .max(4, "Must be 4 characters or more")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

function RegistrationForm(props) {
  const { setShowLogin } = props;
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();

  const registrationSubmit = async (values) => {
    setLoading(true);
    const res = await userRegistration(values);
    if (res.user) {
      alert(res.message);
      setShowLogin(true);
    } else {
      alert(res);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t("registration")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validationSchema}
          onSubmit={registrationSubmit}
          initialValues={{
            name: "",
            password: "",
            email: "",
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
                label={t("name")}
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
                controlId="emailInput"
                label={t("email")}
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.email}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPassword"
                label={t("password")}
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

              <Button variant="primary" type="submit" disabled={isLoading}>
                {t("registration")}
              </Button>
            </Form>
          )}
        </Formik>
        <Alert variant="light">
          {t("orGoTo")}
          <Alert.Link onClick={() => setShowLogin(true)}>
            {t("login")}
          </Alert.Link>
        </Alert>
      </Modal.Body>
    </>
  );
}

export default RegistrationForm;
