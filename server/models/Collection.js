const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

const Collection = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    theme: { type: ObjectId, ref: "Theme", required: true },
    author: { type: ObjectId, ref: "User", required: true },
    itemsCount: { type: Number, default: 0 },
    items: [{ type: ObjectId, ref: "ItemCollection" }],
    // image: { type: ObjectId, ref: "Image" },
  },
  { timestamps: true }
);

module.exports = model("Collection", Collection);
