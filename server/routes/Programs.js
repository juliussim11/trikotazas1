const express = require("express");
const router = express.Router();
const { Programs } = require("../models");

router.get("/", async (req, res) => {
  const listOfPrograms = await Programs.findAll();
  res.json(listOfPrograms);
});

router.post("/", async (req, res) => {
  const program = req.body;
  await Programs.create(program);
  res.json(program);
});

module.exports = router;
