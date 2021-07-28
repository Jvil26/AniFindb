const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongoose").Types.ObjectId;
const {
  registerValidation,
  loginValidation,
  usernameOnlyValidation,
} = require("../validation");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    const emailExist = await User.findOne({
      email: req.body.email.toLowerCase(),
    });
    const usernameExist = await User.findOne({ username: req.body.username });
    if (emailExist)
      return res.status(400).send({ message: "Email already exists" });
    if (usernameExist)
      return res.status(400).send({ message: "Username already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
      dark_mode: false,
      favorites: [],
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

router.post("/profile/update", async (req, res) => {
  try {
    const userID = req.body.userID;
    const newUsername = req.body.newUsername;
    const dark_mode = req.body.dark_mode;

    if (newUsername.length > 0) {
      const { error } = usernameOnlyValidation(req.body);
      if (error) {
        const parsedError = error.details[0].message
          .replace(/["]/g, "")
          .split(" ");
        parsedError[0] =
          parsedError[0].charAt(0).toUpperCase() + parsedError[0].slice(1);
        return res.status(400).send({ message: parsedError.join(" ") });
      }
    }

    const usernameExist = await User.findOne({
      username: req.body.newUsername,
    });
    if (usernameExist) {
      return res.status(400).send({ message: "Username already exists" });
    }
    const { username } = await User.findById(userID);

    const update = {
      username: newUsername.length > 0 ? newUsername : username,
      dark_mode: dark_mode,
    };

    const savedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userID) },
      update,
      {
        new: true,
      }
    );
    res.json({ savedUser: savedUser });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/send-confirmation-email", async (req, res) => {
  const email = req.body.email.toLowerCase();
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      await sgMail.send({
        to: user.email,
        from: "justinsinsin25@gmail.com",
        templateId: "d-a57287a3928a491b8a7da2710caadcd9",
      });
      return res.json({ user: user, message: "Successfully Sent Email!" });
    } else {
      return res.status(400).send({ message: "Email does not exist" });
    }
  } catch (err) {
    console.log(err.toString());
  }
});

router.post("/reset-password", async (req, res) => {
  const newPassword = req.body.newPassword;
  const resetEmail = req.body.resetEmail.toLowerCase();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.findOneAndUpdate(
      { email: resetEmail },
      { password: hashedPassword }
    );
    return res.send({ message: "Password has been reset!" });
  } catch (err) {
    return res.status(400).send({ message: "Failed to reset password" });
  }
});

router.post("/favorites/add", async (req, res) => {
  const item = req.body.item;
  const userID = req.body.userID;
  const category = req.body.category;
  try {
    const user = await User.findById(userID);
    const obj = {
      category: category,
      title: item.title,
      length: item.episodes,
      mal_id: item.mal_id,
      priority: user.favorites.length + 1,
      image_url: item.image_url,
      name_kanji: item.name_kanji ? item.name_kanji : null,
    };
    user.favorites.push(obj);
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.delete("/favorites/remove", async (req, res) => {
  const removeItem = req.body.item;
  const userID = req.body.userID;
  const category = req.body.category;
  try {
    const user = await User.findById(userID);
    user.favorites = user.favorites.filter(
      (item) => item.category !== category && item.mal_id !== removeItem.mal_id
    );
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.sendStatus(400);
  }
});

module.exports = router;
