const express = require("express");
const router = express.Router();
const { QuestionProgram, Questions, Programs } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// router.get("/", async (req, res) => {
//   const listOfQuestionProgram = await QuestionProgram.findAll({
//     attributes: ["id"],
//     include: [
//       {
//         model: Questions,
//         attributes: ["question"],
//       },
//       {
//         model: Programs,
//         attributes: ["title"],
//       },
//     ],
//   });
//   res.json(listOfQuestionProgram);
// });

// router.get("/byId/:id", async (req, res) => {
//   const id = req.params.id;
//   const question = await Questions.findByPk(id);
//   res.json(question);
// });

router.get("/", async (req, res) => {
  const listOfQuestionProgram = await QuestionProgram.findAll();
  res.json(listOfQuestionProgram);
});

router.post("/", async (req, res) => {
  //const questionProgram = req.body;
  // const newQuestionProgram = await QuestionProgram.create(questionProgram);
  // await QuestionProgram.create(questionProgram);
  // res.json(questionProgram);

  const data = req.body;
  console.log(req.body);
  try {
    const questionProgram = await QuestionProgram.create(data);
    res.send(questionProgram);
  } catch (err) {
    res.send(err);
  }
});

// router.delete("/:id", validateToken, async (req, res) => {
//   const id = req.params.id;

//   await Questions.destroy({
//     where: {
//       id: id,
//     },
//   });

//   res.json("DELETED SUCCESFULLY");
// });

// router.put("/:id", validateToken, async (req, res) => {
//   const id = req.params.id;
//   const data = req.body;

//   await Questions.update(data, {
//     where: {
//       id: id,
//     },
//   });

//   res.json("UPDATED SUCCESFULLY");
// });

module.exports = router;
