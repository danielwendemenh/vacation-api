const express = require("express");
const Router = express.Router();
const { userAuth, UserRegister, userLogin } = require("../controllers/auth");

//* http://localhost:3001/users/register-user
Router.post("/register-user", async (req, res) => {
  await UserRegister(req.body, "user", res);
});
//* http://localhost:3001/users/register-admin
Router.post("/register-admin", userAuth, async (req, res) => {
  await UserRegister(req.body, "admin", res);
});
//* http://localhost:3001/users/login-user
Router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});
//* http://localhost:3001/users/login-admin
Router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});
module.exports = Router;
