import React, { useEffect, useState } from "react";
import { getItem } from "../../api/itemsAPI";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Typeahead } from "react-bootstrap-typeahead";
import { useTagsStore } from "../../data/stores/useTagsStore";
import { postItem, putItem } from "../../api/itemsAPI";
import { Button, Card, Form } from "react-bootstrap";

import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

function ItemForm({
  setShow,
  isDarkTheme,
  item,
  setItem,
  isPostItem,
  setIsPostItem,
  collectionID,
  author,
}) {
  const [isLoading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const tags = useTagsStore((state) => state.tags);

  const { t } = useTranslation();

  const getItemForForm = async () => {
    if (item._id) {
      const i = await getItem(item._id);
      setItem(i);
      setSelectedTags(i.tags);
    }
  };

  useEffect(() => {
    getItemForForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { title, _id } = item;

  const handleClose = () => {
    setItem({
      title: "",
      _id: "",
    });
    setIsPostItem(false);
    setShow(false);
  };

  const itemFormSubmit = async (values) => {
    setLoading(true);
    const tags = selectedTags.map((t) => {
      return t._id;
    });
    let res;
    if (isPostItem) {
      res = await postItem(values, collectionID, author, tags);
    } else {
      res = await putItem(values, _id, tags);
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
        <Card.Header as="h5">{t("item")}</Card.Header>
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
              touched,
              setFieldTouched,
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

                <Form.Group className="mb-5">
                  <Form.Label>{t("tags")}</Form.Label>

                  <Typeahead
                    id="basic-typeahead-multiple"
                    labelKey="title"
                    multiple
                    onChange={setSelectedTags}
                    // onChange={handleChange}
                    // onInputChange={(content) => setFieldValue("tags", content)}
                    options={tags}
                    placeholder={t("addTags")}
                    selected={selectedTags}
                  />
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

export default ItemForm;
