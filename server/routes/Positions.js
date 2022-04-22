const express = require("express");
const router = express.Router();
const { Positions } = require("../models");

router.get("/", async (req, res) => {
  const listOfPositions = await Positions.findAll();
  res.json(listOfPositions);
});

// router.get("/:questionId", async (req, res) => {
//   const questionId = req.params.questionId;
//   const position = await Positions.findAll({
//     where: { QuestionId: questionId },
//   });
//   res.json(position);
// });

router.post("/", async (req, res) => {
  const position = req.body;
  await Positions.create(position);
  res.json(position);
});

module.exports = router;
