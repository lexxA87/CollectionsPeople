const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

const Collection = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  theme: { type: String, required: true },
  author: { type: ObjectId, ref: "User", required: true },
  items: [{ type: ObjectId, ref: "ItemCollection" }],
  // image: { type: ObjectId, ref: "Image" },
});

module.exports = model("Collection", Collection);
