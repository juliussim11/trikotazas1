const express = require("express");
const router = express.Router();
const { Programs } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfPrograms = await Programs.findAll();
  res.json(listOfPrograms);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const program = await Programs.findByPk(id);
  res.json(program);
});

router.post("/", validateToken, async (req, res) => {
  const program = req.body;
  const newProgram = await Programs.create(program);
  res.json(newProgram);
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  await Programs.destroy({
    where: {
      id: id,
    },
  });

  res.json("DELETED SUCCESFULLY");
});

router.put("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  await Programs.update(data, {
    where: {
      id: id,
    },
  });

  res.json("UPDATED SUCCESFULLY");
});

module.exports = router;
