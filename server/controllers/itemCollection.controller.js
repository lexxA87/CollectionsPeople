const ItemCollection = require("../models/ItemCollection");
const Collection = require("../models/Collection");

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

const postItem = async (req, res) => {
  const { title, author, collectionParent } = req.body;

  const collection = await Collection.findById(collectionParent);
  console.log(collection);

  const item = await new ItemCollection({ title, author, collectionParent });

  item
    .save()
    .then((item) => {
      collection.items.push(item._id);
      collection.save();
      return res.status(200).json(item);
    })
    .catch((error) => handleError(res, error));
};

const putItem = (req, res) => {
  const { title } = req.body;
  const { id } = req.query;
  ItemCollection.findByIdAndUpdate(id, { title }, { new: true })
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const deleteItem = async (req, res) => {
  // const collection = await Collection.findById(req.query.collID)
  ItemCollection.findByIdAndDelete(req.query.id)
    .then(() => {
      Collection.findByIdAndUpdate(req.query.collID, {
        $pull: { items: req.query.id },
      });
      return res.status(200).json(req.query.id);
    })
    .catch((error) => handleError(res, error));
};

module.exports = { postItem, getItem, getItems, deleteItem, putItem };
