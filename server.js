const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const cors = require("cors");
const admin = require("./server/controllers/admin");
const authRoutes = require("./server/routes/api.auth.routes");
const apiCollection = require("./server/routes/api.collection.routes");
const apiItemCollection = require("./server/routes/api.itemCollection.routes");
const apiComment = require("./server/routes/api.comment.routes");
const apiTag = require("./server/routes/api.tag.routes");

const PORT = process.env.PORT || config.get("serverPort");
const DB_URL = config.get("MongoDBUrl");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, "build")));

app.use("/admin", admin);
app.use("/api/auth", authRoutes);
app.use(apiCollection);
app.use(apiItemCollection);
app.use(apiComment);
app.use(apiTag);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log("Server started on PORT ", PORT);
});
