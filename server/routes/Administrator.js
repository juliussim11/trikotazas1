const express = require("express");
const router = express.Router();
const { Administrator } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfQuestions = await Questions.findAll();
  res.json(listOfQuestions);
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Administrator.create({
      username: username,
      password: hash,
    });
    res.json("SUCCES");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const administrator = await Administrator.findOne({
    where: { username: username },
  });

  if (!administrator) res.json({ error: "Administrator Doesn't Exist" });

  bcrypt.compare(password, administrator.password).then((match) => {
    if (!match) res.json({ error: "WRONG USERNAME AND PASSWORD COMBINATION" });

    const accessToken = sign(
      { username: administrator.username, id: administrator.id },
      "importantsecret"
    );
    res.json(accessToken);
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.administrator);
});

module.exports = router;
