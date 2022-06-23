import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, FloatingLabel, Button, Modal, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { userRegistration } from "../../api/userAPI";

function RegistrationForm(props) {
  const { setShowLogin } = props;
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();

  Yup.setLocale({
    mixed: {
      required: "required",
    },
    string: {
      email: "invalid_email",
    },
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(60, t("field_too_big"))
      .min(2, t("field_too_short"))
      .required(),
    password: Yup.string()
      .min(4, t("field_too_short"))
      .max(20, t("field_too_big"))
      .required(),
    email: Yup.string().email().required(),
  });

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
                  {t(errors.name)}
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
                  {t(errors.email)}
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
                  {t(errors.password)}
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
