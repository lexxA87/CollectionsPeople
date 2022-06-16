const Router = require("express");
const { getThemes } = require("../controllers/theme.controller");

const router = new Router();

router.get("/api/themes", getThemes);

module.exports = router;
