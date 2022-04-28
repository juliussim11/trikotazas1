const express = require("express");
const router = express.Router();
const { Departaments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfDepartaments = await Departaments.findAll();
  res.json(listOfDepartaments);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const departament = await Departaments.findByPk(id);
  res.json(departament);
});

router.post("/", validateToken, async (req, res) => {
  const departament = req.body;
  const newDepartament = await Departaments.create(departament);
  res.json(newDepartament);
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  await Departaments.destroy({
    where: {
      id: id,
    },
  });

  res.json("DELETED SUCCESFULLY");
});

router.put("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  await Departaments.update(data, {
    where: {
      id: id,
    },
  });

  res.json("UPDATED SUCCESFULLY");
});

// DEPARTAMENT QUESTIONS ASSOCIATION:
router.get("/questions/:DepartamentId", async (req, res) => {
  const id = req.params.DepartamentId;
  const departament = await Departaments.findByPk(id);
  const listOfAssociatedQuestions = await departament.getQuestions();
  const associatedQuestions = listOfAssociatedQuestions.map((questions) => {
    return questions;
  });
  res.json(associatedQuestions);
});

module.exports = router;
