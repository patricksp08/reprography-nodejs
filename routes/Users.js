const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.get("/:user", async (req, res ) => {
  user = req.params.user
const usuarios = await users.findAll({where: {
  username: `${user}`
}})
  console.log(usuarios)
  res.json(usuarios)
})


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findAll();

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    res.json("YOU LOGGED IN!!!");
  });
});

module.exports = router;