const Collection = require("../models/Collection");

const handleError = (res, error) => {
  res.status(500).send(error.message);
};

const getCollection = (req, res) => {
  Collection.findById(req.query.id)
    .populate("theme")
    .populate("items", "title")
    .populate("author", "name")
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const getCollections = (req, res) => {
  const { author } = req.query;
  Collection.find({ author })
    .populate("theme")
    .then((cols) => res.status(200).json(cols))
    .catch((error) => handleError(res, error));
};

const getCollectionsSort = (req, res) => {
  const { limit } = req.query;
  Collection.find()
    .sort({ itemsCount: -1 })
    .limit(limit)
    .populate("theme")
    .populate("author", "name")
    .then((cols) => res.status(200).json(cols))
    .catch((error) => handleError(res, error));
};

const putCollection = (req, res) => {
  const { title, description, theme } = req.body;
  const { id } = req.query;
  Collection.findByIdAndUpdate(id, { title, description, theme }, { new: true })
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const deleteCollection = (req, res) => {
  Collection.findByIdAndDelete(req.query.id)
    .then(() => res.status(200).json(req.query.id))
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
  getCollectionsSort,
};
