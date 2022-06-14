const ItemCollection = require("../models/ItemCollection");

const handleError = (res, error) => {
  res.status(500).send(error.message);
};

const getItem = (req, res) => {
  ItemCollection.findById(req.query.id)
    .then((item) => res.status(200).json(item))
    .catch((error) => handleError(res, error));
};

const getItems = (req, res) => {
  ItemCollection.find()
    .then((items) => res.status(200).json(items))
    .catch((error) => handleError(res, error));
};

const postItem = (req, res) => {
  const { title, author, collectionParent } = req.body;

  const item = new ItemCollection({ title, author, collectionParent });

  item
    .save()
    .then((item) => res.status(200).json(item))
    .catch((error) => handleError(res, error));
};

const putItem = (req, res) => {
  const { title } = req.body;
  const { id } = req.query;
  ItemCollection.findByIdAndUpdate(id, { title }, { new: true })
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const deleteItem = (req, res) => {
  ItemCollection.findByIdAndDelete(req.query.id)
    .then(() => res.status(200).json(req.query.id))
    .catch((error) => handleError(res, error));
};

module.exports = { postItem, getItem, getItems, deleteItem, putItem };
