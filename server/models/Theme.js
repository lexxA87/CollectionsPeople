const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

const Theme = new Schema({
  name: { type: String, required: true, unique: true },
  collections: [{ type: ObjectId, ref: "Collection" }],
});

module.exports = model("Theme", Theme);
