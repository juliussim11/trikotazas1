const express = require("express");
const router = express.Router();
const { Questions, Programs, QuestionProgram } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfQuestions = await Questions.findAll();
  res.json(listOfQuestions);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const question = await Questions.findByPk(id);
  res.json(question);
});

router.post("/", validateToken, async (req, res) => {
  const question = req.body;
  const newQuestion = await Questions.create(question);
  res.json(newQuestion);
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  await Questions.destroy({
    where: {
      id: id,
    },
  });

  res.json("DELETED SUCCESFULLY");
});

router.put("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  await Questions.update(data, {
    where: {
      id: id,
    },
  });

  res.json("UPDATED SUCCESFULLY");
});

// QUESTION PROGRAMS ASSOCIATION:
router.get("/:questionId/programs", async (req, res) => {
  const id = req.params.questionId;
  console.log("REQ PARAMS!!!!!!!!!!!!!!!!!!!: ", id);
  const question = await Questions.findByPk(id);
  const listOfAssociatedPrograms = await question.getPrograms({
    attributes: ["id"],
  });
  const associatedProgramsIds = listOfAssociatedPrograms.map((programs) => {
    return programs.id;
  });
  res.json(associatedProgramsIds);
});

router.get("/add/:questionId/program/:programId", async (req, res) => {
  const { questionId, programId } = req.params;
  console.log("PROGRAM: ", Programs);
  const program = await Programs.findAll({
    where: { id: programId },
    attributes: ["id"],
  });
  const question = await Questions.findByPk(questionId);
  console.log(question);
  await question.addPrograms(program);
});

router.get("/delete/:questionId/program/:programId", async (req, res) => {
  const { questionId, programId } = req.params;
  const program = await Programs.findAll({
    where: { id: programId },
    attributes: ["id"],
  });
  const question = await Questions.findByPk(questionId);
  console.log(question);
  await question.removePrograms(program);
});

module.exports = router;
