const router = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model.js");

router.post("/register", async (req, res) => {
  try {
    const userInfo = {
      username: req.body.username,
      password: req.body.password
    };
    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS);
    userInfo.password = hash;
    const newUser = await Users.add(userInfo);
    res.status(201).json(newUser);
  } catch (err) {
    console.log("user register post error", err);
    res.status(500).json({
      message: "there was an error when registering a new user",
      error: err
    });
  }
});

module.exports = router;
