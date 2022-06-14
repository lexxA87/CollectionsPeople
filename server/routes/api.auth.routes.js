const Router = require("express");
const { check } = require("express-validator");
const {
  userRegistration,
  userLogin,
} = require("../controllers/auth.controller");

const router = new Router();

router.post(
  "/registration",
  [
    check("email", "Uncorrect email").isEmail(),
    check("name", "Uncorrect name").isLength({ min: 1, max: 20 }),
    check(
      "password",
      "Password should be longer than 3 and shorter than 12"
    ).isLength({ min: 1, max: 12 }),
  ],
  userRegistration
);

router.post("/login", userLogin);

module.exports = router;
