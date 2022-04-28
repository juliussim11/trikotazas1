const express = require("express");
const router = express.Router();
const { Positions } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfPositions = await Positions.findAll();
  res.json(listOfPositions);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const position = await Positions.findByPk(id);
  res.json(position);
});

router.post("/", validateToken, async (req, res) => {
  const position = req.body;
  const newPosition = await Positions.create(position);
  res.json(newPosition);
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  await Positions.destroy({
    where: {
      id: id,
    },
  });

  res.json("DELETED SUCCESFULLY");
});

router.put("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  await Positions.update(data, {
    where: {
      id: id,
    },
  });

  res.json("UPDATED SUCCESFULLY");
});

// POSITION QUESTIONS ASSOCIATION:
router.get("/questions/:PositionId", async (req, res) => {
  const id = req.params.PositionId;
  const position = await Positions.findByPk(id);
  const listOfAssociatedQuestions = await position.getQuestions();
  const associatedQuestions = listOfAssociatedQuestions.map((questions) => {
    return questions;
  });
  res.json(associatedQuestions);
});

module.exports = router;
