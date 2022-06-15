const Router = require("express");
const {
  postTag,
  getTag,
  getTags,
  putTag,
  deleteTag,
} = require("../controllers/tag.controller");

const router = new Router();

router.post("/api/tag", postTag);
router.get("/api/tags", getTags);
router.get("/api/tag", getTag);
router.put("/api/tag", putTag);
router.delete("/api/tag", deleteTag);

module.exports = router;
