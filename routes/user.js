const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/user.controller");

const app = express();

app.post("/register", registerUser);
app.post("/login", loginUser);
app.get("/all-users", getAllUsers);

module.exports = app;
