const ItemCollection = require("../models/ItemCollection");
const Collection = require("../models/Collection");

const handleError = (res, error) => {
  res.status(500).send(error.message);
};

const getItem = (req, res) => {
  ItemCollection.findById(req.query.id)
    .populate("tags")
    .then((item) => res.status(200).json(item))
    .catch((error) => handleError(res, error));
};

const getItems = (req, res) => {
  ItemCollection.find()
    .then((items) => res.status(200).json(items))
    .catch((error) => handleError(res, error));
};

const getItemsSort = (req, res) => {
  const { limit } = req.query;
  ItemCollection.find()
    .sort({ $natural: -1 })
    .limit(limit)
    .populate("author", "name")
    .populate("collectionParent", "title")
    .populate("tags")
    .then((items) => res.status(200).json(items))
    .catch((error) => handleError(res, error));
};

const postItem = async (req, res) => {
  const { title, author, collectionParent, tags } = req.body;

  const collection = await Collection.findById(collectionParent);

  const item = await new ItemCollection({
    title,
    author,
    collectionParent,
    tags,
  });

  item
    .save()
    .then((item) => {
      collection.items.push(item._id);
      collection.itemsCount++;
      collection.save();
      return res.status(200).json(item);
    })
    .catch((error) => handleError(res, error));
};

const putItem = (req, res) => {
  const { title, tags } = req.body;
  const { id } = req.query;
  ItemCollection.findByIdAndUpdate(id, { title, tags }, { new: true })
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const deleteItem = async (req, res) => {
  const collection = await Collection.findByIdAndUpdate(req.query.collID, {
    $pull: { items: req.query.id },
  });
  ItemCollection.findByIdAndDelete(req.query.id)
    .then(() => {
      collection.itemsCount--;
      collection.save();
      return res.status(200).json(req.query.id);
    })
    .catch((error) => handleError(res, error));
};

module.exports = {
  postItem,
  getItem,
  getItems,
  deleteItem,
  putItem,
  getItemsSort,
};
