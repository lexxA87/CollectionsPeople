const Tag = require("../models/Tag");

const handleError = (res, error) => {
  res.status(500).send(error.message);
};

const getTag = (req, res) => {
  Tag.findById(req.query.id)
    .then((tag) => res.status(200).json(tag))
    .catch((error) => handleError(res, error));
};

const getTags = (req, res) => {
  Tag.find()
    .then((tags) => res.status(200).json(tags))
    .catch((error) => handleError(res, error));
};

const getTagsForCloud = (req, res) => {
  const { limit } = req.query;
  Tag.find()
    .limit(limit)
    .then((tags) => res.status(200).json(tags))
    .catch((error) => handleError(res, error));
};

const putTag = (req, res) => {
  const { title } = req.body;
  const { id } = req.query;
  Tag.findByIdAndUpdate(id, { title }, { new: true })
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const deleteTag = (req, res) => {
  Tag.findByIdAndDelete(req.query.id)
    .then(() => res.status(200).json(req.query.id))
    .catch((error) => handleError(res, error));
};

const postTag = (req, res) => {
  const { title } = req.body;

  const comment = new Tag({
    title,
  });
  comment
    .save()
    .then((tag) => res.status(200).json(tag))
    .catch((error) => handleError(res, error));
};

module.exports = {
  postTag,
  getTag,
  getTags,
  putTag,
  deleteTag,
  getTagsForCloud,
};
