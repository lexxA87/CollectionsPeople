const Router = require("express");
const {
  postComment,
  getComment,
  getComments,
  putComment,
  deleteComment,
} = require("../controllers/comment.controller");

const router = new Router();

router.post("/api/comment", postComment);
router.get("/api/comments", getComments);
router.get("/api/comment", getComment);
router.put("/api/comment", putComment);
router.delete("/api/comment", deleteComment);

module.exports = router;
