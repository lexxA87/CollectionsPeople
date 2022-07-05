import React, { useState } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { postItem, putItem } from "../../api/itemsAPI";
import { Button, Card, Form } from "react-bootstrap";

function ItemForm({
  setShow,
  isDarkTheme,
  item,
  setItem,
  author,
  collectionID,
  isPostItem,
  setIsPostItem,
}) {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();

  const { title, _id } = item;

  const handleClose = () => {
    setItem({
      title: "",
      author: "",
      collectionParent: "",
    });
    setIsPostItem(false);
    setShow(false);
  };

  const itemFormSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    let res;
    if (isPostItem) {
      res = await postItem(values, collectionID, author);
    } else {
      res = await putItem(values, _id);
    }

    if (res.title) {
      handleClose();
    }

    setLoading(false);
  };

  Yup.setLocale({
    mixed: {
      required: "required",
    },
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
  });

  return (
    <>
      <Card bg={isDarkTheme && "dark"} text={isDarkTheme && "light"}>
        <Card.Header as="h5">Edit Item</Card.Header>
        <Card.Body>
          <Formik
            onSubmit={itemFormSubmit}
            validationSchema={validationSchema}
            initialValues={{
              title: title,
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              setFieldValue,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="titleInput">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t(errors.title)}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button variant="success" type="submit" disabled={isLoading}>
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
        <Card.Footer className="justify-content-end hstack gap-3 mx-2">
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Close
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default ItemForm;
