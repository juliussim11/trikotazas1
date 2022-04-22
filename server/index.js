const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const questionRouter = require("./routes/Questions");
app.use("/questions", questionRouter);
const positionRouter = require("./routes/Positions");
app.use("/positions", positionRouter);
const administratorRouter = require("./routes/Administrator");
app.use("/administrator", administratorRouter);

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});
