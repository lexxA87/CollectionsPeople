const Router = require("express");
const {
  postItem,
  getItem,
  getItems,
  deleteItem,
  putItem,
  getItemsSort,
  getItemsSortByTag,
  getItemsSearch,
} = require("../controllers/itemCollection.controller");

const router = new Router();

router.post("/api/itemCollection", postItem);
router.get("/api/itemCollections", getItems);
router.get("/api/itemCollectionsSort", getItemsSort);
router.get("/api/itemCollectionsSortByTag", getItemsSortByTag);
router.get("/api/itemCollectionsSearch", getItemsSearch);
router.get("/api/itemCollection", getItem);
router.put("/api/itemCollection", putItem);
router.delete("/api/itemCollection", deleteItem);

module.exports = router;
