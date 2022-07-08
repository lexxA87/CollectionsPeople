const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

const Tag = new Schema({
  title: { type: String, required: true, unique: true },
  itemsCollection: [{ type: ObjectId, ref: "ItemCollection" }],
  itemCollectionCount: { type: Number, default: 0 },
});

module.exports = model("Tag", Tag);
