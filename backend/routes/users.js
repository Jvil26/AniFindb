const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      const parsedError = error.details[0].message
        .replace(/["]/g, "")
        .split(" ");
      parsedError[0] =
        parsedError[0].charAt(0).toUpperCase() + parsedError[0].slice(1);
      return res.status(400).send({ message: parsedError.join(" ") });
    }

    const emailExist = await User.findOne({ email: req.body.email });
    const usernameExist = await User.findOne({ username: req.body.username });
    if (emailExist)
      return res.status(400).send({ message: "Email already exists" });
    if (usernameExist)
      return res.status(400).send({ message: "Username already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    const token = jwt.sign(savedUser.toJSON(), process.env.ACCESS_TOKEN_SECRET);
    res.header("auth-token", token);
    res.json({ user: savedUser, accessToken: token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      const parsedError = error.details[0].message
        .replace(/["]/g, "")
        .split(" ");
      parsedError[0] =
        parsedError[0].charAt(0).toUpperCase() + parsedError[0].slice(1);
      return res.status(400).send({ message: parsedError.join(" ") });
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send({ message: "Username is invalid" });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(400).send({ message: "Password is invalid" });

    const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
    res.header("auth-token", token);
    res.json({ user: user, accessToken: token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/profile", async (req, res) => {
  const user = req.body.user;
  const newUsername = req.body.username;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
});

module.exports = router;
