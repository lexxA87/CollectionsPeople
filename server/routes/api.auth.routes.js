const Router = require("express");
const { check } = require("express-validator");
const {
  userRegistration,
  userLogin,
  userAuth,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = new Router();

router.post(
  "/registration",
  [
    check("email", "Uncorrect email").isEmail(),
    check("name", "Uncorrect name").isLength({ min: 2, max: 60 }),
    check(
      "password",
      "Password should be longer than 3 and shorter than 20"
    ).isLength({ min: 4, max: 20 }),
  ],
  userRegistration
);

router.post("/login", userLogin);

router.get("/auth", authMiddleware, userAuth);

module.exports = router;
