const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Theme = new Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = model("Theme", Theme);
