const Comment = require("../models/Comment");

const handleError = (res, error) => {
  res.status(500).send(error.message);
};

const getComment = (req, res) => {
  Comment.findById(req.query.id)
    .then((comment) => res.status(200).json(comment))
    .catch((error) => handleError(res, error));
};

const getComments = (req, res) => {
  const { itemParent } = req.query;
  Comment.find({ itemParent: itemParent })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => handleError(res, error));
};

const putComment = (req, res) => {
  const { text } = req.body;
  const { id } = req.query;
  Comment.findByIdAndUpdate(id, { text }, { new: true })
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const deleteComment = (req, res) => {
  Comment.findByIdAndDelete(req.query.id)
    .then(() => res.status(200).json(req.query.id))
    .catch((error) => handleError(res, error));
};

const postComment = (req, res) => {
  const { text, itemParent, author } = req.body;

  const comment = new Comment({
    text,
    itemParent,
    author,
  });
  comment
    .save()
    .then((comment) => res.status(200).json(comment))
    .catch((error) => handleError(res, error));
};

module.exports = {
  postComment,
  getComment,
  getComments,
  putComment,
  deleteComment,
};
