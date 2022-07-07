import React, { useState } from "react";
import { useThemesStore } from "../../data/stores/useThemesStore";
import { Formik } from "formik";
import MDEditor from "@uiw/react-md-editor";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
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
  const handleClose = () => {
    setCollection({
      title: "",
      description: "",
      theme: "",
      _id: "",
    });
    setIsPostColl(false);
    setShow(false);
  };
  const { t } = useTranslation();

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
    description: Yup.string().required(),
  });

  return (
    <>
      <Card bg={isDarkTheme && "dark"} text={isDarkTheme && "light"}>
        <Card.Header as="h5">{t("collection")}</Card.Header>
        <Card.Body>
          <Formik
            onSubmit={collectionSubmit}
            validationSchema={validationSchema}
            initialValues={{
              title: title,
              description: description,
              theme: theme._id || themes[4]._id,
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
                  <Form.Label>{t("title")}</Form.Label>
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

                <Form.Group
                  className="mb-3"
                  controlId="descriptionInput"
                  data-color-mode="light"
                >
                  <Form.Label>{t("description")}</Form.Label>
                  <MDEditor
                    value={values.description}
                    onChange={(content) =>
                      setFieldValue("description", content)
                    }
                    data-color-mode="light"
                    className="wmde-markdown-var"
                    textareaProps={{
                      name: "description",
                      required: true,
                    }}
                  />
                  <div
                    class="invalid-feedback"
                    style={{
                      display: !!errors.description ? "inherit" : "none",
                    }}
                  >
                    {t(errors.description)}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="themesSelect">
                  <Form.Label>{t("theme")}</Form.Label>
                  <Form.Select
                    aria-label="Default select"
                    name="theme"
                    onChange={handleChange}
                    defaultValue={theme._id || themes[4]._id}
                  >
                    {themes.map((them, i) => {
                      return (
                        <option key={i} value={them._id}>
                          {them.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>

                <Button variant="success" type="submit" disabled={isLoading}>
                  {t("save")}
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
            {t("close")}
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default CollectionForm;
