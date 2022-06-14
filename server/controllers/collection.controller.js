const Collection = require("../models/Collection");

const handleError = (res, error) => {
  console.log(error);
  res.send({ message: "Server error" });
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

module.exports = { postCollection };
