const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Auth error!" });
    }

    const decoded = jwt.verify(token, config.get("secretKey"));
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth error!" });
  }
};
