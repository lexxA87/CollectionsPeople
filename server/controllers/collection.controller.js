const Collection = require("../models/Collection");

const handleError = (res, error) => {
  res.status(500).send(error.message);
};

const getCollection = (req, res) => {
  Collection.findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const getCollections = (req, res) => {
  Collection.find()
    .then((cols) => res.status(200).json(cols))
    .catch((error) => handleError(res, error));
};

const putCollection = (req, res) => {
  const { title, description, author } = req.body;
  const { id } = req.params;
  Collection.findByIdAndUpdate(
    id,
    { title, description, author },
    { new: true }
  )
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const deleteCollection = (req, res) => {
  Collection.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(req.params.id))
    .catch((error) => handleError(res, error));
};

const postCollection = (req, res) => {
  const { title, description, theme, author } = req.body;

  const collection = new Collection({
    title,
    description,
    theme,
    author,
  });
  collection
    .save()
    .then((collect) => res.status(200).json(collect))
    .catch((error) => handleError(res, error));
};

module.exports = {
  postCollection,
  getCollection,
  getCollections,
  putCollection,
  deleteCollection,
};
