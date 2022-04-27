const express = require("express");
const router = express.Router();
const { Questions, Programs, Positions, Departaments } = require("../models");
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
router.get("/programs/:QuestionId", async (req, res) => {
  const id = req.params.QuestionId;
  const question = await Questions.findByPk(id);
  const listOfAssociatedPrograms = await question.getPrograms({
    attributes: ["id"],
  });
  const associatedProgramsIds = listOfAssociatedPrograms.map((programs) => {
    return programs.id;
  });
  res.json(associatedProgramsIds);
});

router.get("/add/:QuestionId/program/:ProgramId", async (req, res) => {
  const { QuestionId, ProgramId } = req.params;
  const program = await Programs.findAll({
    where: { id: ProgramId },
    attributes: ["id"],
  });
  const question = await Questions.findByPk(QuestionId);
  await question.addPrograms(program);
});

router.get("/delete/:QuestionId/program/:ProgramId", async (req, res) => {
  const { QuestionId, ProgramId } = req.params;
  const program = await Programs.findAll({
    where: { id: ProgramId },
    attributes: ["id"],
  });
  const question = await Questions.findByPk(QuestionId);
  await question.removePrograms(program);
});

// QUESTION POSITIONS ASSOCIATION:
router.get("/positions/:QuestionId", async (req, res) => {
  const id = req.params.QuestionId;
  const question = await Questions.findByPk(id);
  const listOfAssociatedPositions = await question.getPositions({
    attributes: ["id"],
  });
  const associatedPositionsIds = listOfAssociatedPositions.map((positions) => {
    return positions.id;
  });
  res.json(associatedPositionsIds);
});

router.get("/add/:QuestionId/position/:PositionId", async (req, res) => {
  const { QuestionId, PositionId } = req.params;
  const position = await Positions.findAll({
    where: { id: PositionId },
    attributes: ["id"],
  });
  const question = await Questions.findByPk(QuestionId);
  await question.addPositions(position);
});

router.get("/delete/:QuestionId/position/:PositionId", async (req, res) => {
  const { QuestionId, PositionId } = req.params;
  const position = await Positions.findAll({
    where: { id: PositionId },
    attributes: ["id"],
  });
  const question = await Questions.findByPk(QuestionId);
  await question.removePositions(position);
});

// QUESTION DEPARTAMENTS ASSOCIATION:
router.get("/departaments/:QuestionId", async (req, res) => {
  const id = req.params.QuestionId;
  const question = await Questions.findByPk(id);
  const listOfAssociatedDepartaments = await question.getDepartaments({
    attributes: ["id"],
  });
  const associatedDepartamentsIds = listOfAssociatedDepartaments.map(
    (departaments) => {
      return departaments.id;
    }
  );
  res.json(associatedDepartamentsIds);
});

router.get("/add/:QuestionId/departament/:DepartamentId", async (req, res) => {
  const { QuestionId, DepartamentId } = req.params;
  const departament = await Departaments.findAll({
    where: { id: DepartamentId },
    attributes: ["id"],
  });
  const question = await Questions.findByPk(QuestionId);
  await question.addDepartaments(departament);
});

router.get("/delete/:QuestionId/departament/:DepartamentId", async (req, res) => {
  const { QuestionId, DepartamentId } = req.params;
  const departament = await Departaments.findAll({
    where: { id: DepartamentId },
    attributes: ["id"],
  });
  const question = await Questions.findByPk(QuestionId);
  await question.removeDepartaments(departament);
});

module.exports = router;
