import React, { useState } from "react";
import { Form, FloatingLabel, Button, Modal, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import { userLogin } from "../../api/userAPI";
import { useCurrentUserStore } from "../../data/stores/useCurrentUserStore";

function LoginForm(props) {
  const { setShowLogin, handleClose } = props;
  const [isLoading, setLoading] = useState(false);
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);
  const setIsAuth = useCurrentUserStore((state) => state.setIsAuth);
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
    password: Yup.string()
      .min(4, t("field_too_short"))
      .max(20, t("field_too_big"))
      .required(),
    email: Yup.string().email().required(),
  });

  const loginSubmit = async (values) => {
    setLoading(true);
    const res = await userLogin(values);
    if (res.name) {
      setCurrentUser(res);
      setIsAuth(true);
      handleClose();
    } else {
      alert(res);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t("login")}</Modal.Title>
      </Modal.Header>
      <Modal.Body bg="dark" variant="dark">
        <Formik
          validationSchema={validationSchema}
          onSubmit={loginSubmit}
          initialValues={{
            email: "",
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

              <Button variant="success" type="submit" disabled={isLoading}>
                {t("login")}
              </Button>
            </Form>
          )}
        </Formik>
        <Alert variant="light">
          {t("orGoTo")}
          <Alert.Link onClick={() => setShowLogin(false)}>
            {t("registration")}
          </Alert.Link>
        </Alert>
      </Modal.Body>
    </>
  );
}

export default LoginForm;
