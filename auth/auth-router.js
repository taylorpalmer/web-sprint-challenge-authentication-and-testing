const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./users-model");

const router = require("express").Router();

router.post("/authRouter/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }

    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 15),
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/authRouter/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (!user) {
      return res.status(401).json({
        message: "You shall not pass!",
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: "You shall not pass!",
      });
    }

    const payload = {
      userId: user.id,
      username: user.username,
    };

    res.json({
      token: jwt.sign(payload, process.env.JWT_SECRET),
      message: `Welcome ${user.username}!`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
