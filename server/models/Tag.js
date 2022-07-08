const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Tag = new Schema({
  title: { type: String, required: true, unique: true },
});

module.exports = model("Tag", Tag);
