const express = require("express");
const {
  userRegister,
  userLogin,
  getUserData,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/usersdata",getUserData);

module.exports = {
  userRouter,
};
