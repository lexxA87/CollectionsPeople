const Router = require("express");
const { postCollection } = require("../controllers/collection.controller");

const router = new Router();

router.post("/api/collection", postCollection);

module.exports = router;
