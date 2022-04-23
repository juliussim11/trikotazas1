const express = require("express");
const router = express.Router();
const { Departaments } = require("../models");

router.get("/", async (req, res) => {
  const listOfDepartaments = await Departaments.findAll();
  res.json(listOfDepartaments);
});

router.post("/", async (req, res) => {
  const departament = req.body;
  await Departaments.create(departament);
  res.json(departament);
});

module.exports = router;
