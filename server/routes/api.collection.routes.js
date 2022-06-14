const Router = require("express");
const {
  postCollection,
  getCollection,
  getCollections,
  putCollection,
  deleteCollection,
} = require("../controllers/collection.controller");

const router = new Router();

router.post("/api/collection", postCollection);
router.get("/api/collections", getCollections);
router.get("/api/collection/:id", getCollection);
router.put("/api/collection/:id", putCollection);
router.delete("/api/collection/:id", deleteCollection);

module.exports = router;
