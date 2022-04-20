//import express from "express";
const express = require("express");

const db = require("./models");

const app = express();

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});
