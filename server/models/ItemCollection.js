const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

const ItemCollection = new Schema(
  {
    title: { type: String, required: true },
    author: { type: ObjectId, ref: "User", required: true },
    collectionParent: { type: ObjectId, ref: "Collection", required: true },
    likes: { type: Number, default: 0 },
    tags: [{ type: ObjectId, ref: "Tag" }],
    comments: [{ type: ObjectId, ref: "Comment" }],
    additionalFields: [],
  },
  { timestamps: true, strict: false }
);

ItemCollection.index({ "$**": "text" });

module.exports = model("ItemCollection", ItemCollection);
