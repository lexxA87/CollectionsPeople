import React, { useState } from "react";
import { Form, FloatingLabel, Button, Modal, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import { userLogin } from "../../api/userAPI";
import { useCurrentUserStore } from "../../data/stores/useCurrentUserStore";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(60, "Must be 60 characters or less")
    .required("Required"),
  password: Yup.string()
    .min(4, "Must be 4 characters or more")
    .required("Required"),
});

function LoginForm(props) {
  const { setShowLogin, handleClose } = props;
  const [isLoading, setLoading] = useState(false);
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);
  const setIsAuth = useCurrentUserStore((state) => state.setIsAuth);
  const { t } = useTranslation();

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
