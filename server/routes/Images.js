const express = require("express");
const router = express.Router();
const { Images } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const listOfImages = await Images.findAll();
  res.json(listOfImages);
});

router.get("/byId/:QuestionId", async (req, res) => {
  const QuestionId = req.params.QuestionId;
  const image = await Images.findAll({
    where: { QuestionId: QuestionId },
  });
  res.json(image);
});

router.post("/", upload.single("image"), async (req, res) => {
  console.log("BODYYYYYYYYYYYYYYYYY: ", req.file);
  if (!req.file) {
    console.log("No file upload");
  } else {
    const image = {
      image: req.file.filename,
      QuestionId: req.body.QuestionId,
    };
    const newImage = await Images.create(image);
    res.json(newImage);
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;

  await Images.destroy({
    where: {
      id: id,
    },
  });

  res.json("DELETED SUCCESFULLY");
});

module.exports = router;
