import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

function SearchForm() {
  const { t } = useTranslation();
  const redirect = useNavigate();

  const searchSubmit = (values) => {
    redirect(`/searchpage/search${values.text}`);
  };

  return (
    <>
      <Formik
        onSubmit={(values, { resetForm }) => {
          searchSubmit(values);
          resetForm();
        }}
        initialValues={{
          text: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          resetForm,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form
            className="d-flex mx-auto my-3 col-lg-4"
            noValidate
            onSubmit={handleSubmit}
          >
            <FormControl
              type="search"
              placeholder={t("search")}
              className="me-2"
              aria-label="Search"
              name="text"
              value={values.text}
              onChange={handleChange}
            />
            <Button type="submit" variant="outline-success">
              {t("search")}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default SearchForm;
