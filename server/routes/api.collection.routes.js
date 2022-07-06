const Router = require("express");
const {
  postCollection,
  getCollection,
  getCollections,
  putCollection,
  deleteCollection,
  getCollectionsSort,
} = require("../controllers/collection.controller");

const router = new Router();

router.post("/api/collection", postCollection);
router.get("/api/collections", getCollections);
router.get("/api/collectionsSort", getCollectionsSort);
router.get("/api/collection", getCollection);
router.put("/api/collection", putCollection);
router.delete("/api/collection", deleteCollection);

module.exports = router;
