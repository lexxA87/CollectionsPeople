const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

const User = new Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, required: true },
  collections: [{ type: ObjectId, ref: "Collection" }],
});

module.exports = model("User", User);
