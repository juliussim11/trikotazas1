const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const questionRouter = require("./routes/Questions");
app.use("/questions", questionRouter);
const imageRouter = require("./routes/Images");
app.use("/images", imageRouter);
const positionRouter = require("./routes/Positions");
app.use("/positions", positionRouter);
const programRouter = require("./routes/Programs");
app.use("/programs", programRouter);
const departamentRouter = require("./routes/Departaments");
app.use("/departaments", departamentRouter);
const administratorRouter = require("./routes/Administrator");
app.use("/administrator", administratorRouter);

app.use(express.static('Images'));

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});
