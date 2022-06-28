import React, { useState } from "react";
import { useThemesStore } from "../../data/stores/useThemesStore";
import { Formik } from "formik";
import { Button, Card, Form } from "react-bootstrap";
import { postCollection, putCollection } from "../../api/collectionAPI";

function CollectionForm({
  setShow,
  collection,
  setCollection,
  isDarkTheme,
  userId,
  isPostColl,
  setIsPostColl,
}) {
  const themes = useThemesStore((state) => state.themes);
  const [isLoading, setLoading] = useState(false);
  const handleClose = () => setShow(false);

  const { title, description, theme, _id } = collection;

  const collectionSubmit = async (values) => {
    setLoading(true);
    let res;
    if (isPostColl) {
      res = await postCollection(values, userId);
    } else {
      res = await putCollection(values, _id);
    }
    if (res.title) {
      setCollection({
        title: "",
        description: "",
        theme: "",
        _id: "",
      });
      setIsPostColl(false);

      handleClose();
    }

    setLoading(false);
  };

  return (
    <>
      <Card bg={isDarkTheme && "dark"} text={isDarkTheme && "light"}>
        <Card.Header as="h5">Edit Collection</Card.Header>
        <Card.Body>
          <Formik
            onSubmit={collectionSubmit}
            initialValues={{
              title: title,
              description: description,
              theme: theme._id,
            }}
          >
            {({ handleSubmit, handleChange, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Theme</Form.Label>
                  <Form.Select
                    aria-label="Default select"
                    name="theme"
                    onChange={handleChange}
                  >
                    {themes.map((them) => {
                      return (
                        <option
                          value={them._id}
                          selected={them.name === theme.name ? true : false}
                        >
                          {them.name}
                        </option>
                      );
                    })}
                  </Form.Select>
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

export default CollectionForm;
