const mongoose = require("mongoose");
const { Schema, model, ObjectId } = mongoose;

const Image = new Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
  collection: { type: ObjectId, ref: "ItemCollection" },
});

module.exports = model("Image", Image);
