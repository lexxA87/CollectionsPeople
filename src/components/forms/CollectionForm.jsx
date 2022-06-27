import React, { useState } from "react";
import { useThemesStore } from "../../data/stores/useThemesStore";
import { Formik } from "formik";
import { Button, Card, Form } from "react-bootstrap";
import { putCollection } from "../../api/collectionAPI";

function CollectionForm({ setShow, collection }) {
  const themes = useThemesStore((state) => state.themes);
  const [isLoading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const { title, description, theme, id } = collection;

  const collectionSubmit = async (values) => {
    setLoading(true);
    const res = await putCollection(values, id);
    if (res.title) {
      handleClose();
    }

    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Header as="h5">CollectionForm</Card.Header>
        <Card.Body>
          <Formik
            onSubmit={collectionSubmit}
            initialValues={{
              title: title,
              description: description,
              theme: theme.name,
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
                <Form.Control
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                />
                <Form.Control
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                />
                <Form.Select>
                  {/* <option value={theme.name}>{theme.name}</option> */}
                  {themes.map((them) => {
                    return (
                      <option
                        value={them.name}
                        selected={them.name === theme.name ? true : false}
                      >
                        {them.name}
                      </option>
                    );
                  })}
                </Form.Select>

                <Button variant="success" type="submit" disabled={isLoading}>
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default CollectionForm;
