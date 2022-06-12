const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

const Item = new Schema({
  title: { type: String, required: true },
  likes: { type: Number },
  author: { type: ObjectId, ref: "User", required: true },
  collection: { type: ObjectId, ref: "Collection", required: true },
  tags: [{ type: ObjectId, ref: "Tag" }],
  comments: [{ type: ObjectId, ref: "Comment" }],
});

module.exports = model("Item", Item);
