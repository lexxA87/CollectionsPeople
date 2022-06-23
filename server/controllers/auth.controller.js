const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const userRegistration = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Uncorrect request", errors });
    }

    const { email, password, name } = req.body;

    const condidateEmail = await User.findOne({ email });
    const condidateName = await User.findOne({ name });

    if (condidateEmail) {
      return res.status(400).json({
        message: `User with email ${email} already exist!`,
      });
    }
    if (condidateName) {
      return res.status(400).json({
        message: `User with name ${name} already exist!`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const user = new User({
      email,
      password: hashPassword,
      name,
    });
    await user.save();

    return res.status(200).json({
      message: "User was created",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);

    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (user.blocked) {
      return res.status(403).json({ message: "User was blocked" });
    }

    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1d",
    });

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};

const userAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1d",
    });

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};

module.exports = { userRegistration, userLogin, userAuth };
