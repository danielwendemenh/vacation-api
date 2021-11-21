const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const dbCalls = require("../controllers/dbCalls");
const { DB } = require("../config");
const { userAuth } = require("../controllers/auth");

mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {}
);
//* get returns all items http://localhost:3001/vacations/
Router.get("", (req, res) => dbCalls.getAllVacations(req, res));

//* get returns all items http://localhost:3001/vacations/:id
Router.get("/:id", (req, res) => dbCalls.getOne(req, res));

//* search requires id http://localhost:3001/vacations/search/:city
Router.get("/search", (req, res) => dbCalls.searchByCity(req, res));

//* post requires fields via req.body http://localhost:3001/vacations/add-vacation
Router.post("/add-vacation", userAuth, (req, res) =>
  dbCalls.addVacation(req, res)
);

//* delete requires id http://localhost:3001/vacations/delete/:id
Router.delete("/delete/:id", userAuth, (req, res) => dbCalls.delete(req, res));

//* patch requires via req.body id and fields http://localhost:3001/vacations/update
Router.patch("/update", userAuth, (req, res) => dbCalls.update(req, res));

module.exports = Router;
