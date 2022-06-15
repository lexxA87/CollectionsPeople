const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

const Comment = new Schema(
  {
    text: { type: String, required: true },
    author: { type: ObjectId, ref: "User", required: true },
    itemParent: { type: ObjectId, ref: "ItemCollection", required: true },
  },
  { timestamps: true }
);

module.exports = model("Comment", Comment);
