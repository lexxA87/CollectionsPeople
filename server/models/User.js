const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

const User = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  collections: [{ type: ObjectId, ref: "Collection" }],
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("User", User);
