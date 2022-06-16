const Theme = require("../models/Theme");

const handleError = (res, error) => {
  res.status(500).send(error.message);
};

const getThemes = (req, res) => {
  Theme.find()
    .then((tags) => res.status(200).json(tags))
    .catch((error) => handleError(res, error));
};

module.exports = {
  getThemes,
};
