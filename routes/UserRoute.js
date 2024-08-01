import express from "express";
import {
  getUser,
  Login,
  LogOut,
  Register,
} from "../controllers/UserController.js";
import { RefreshToken } from "../controllers/RefreshToken.js";
import {
  adminAndPenjualVerify,
  VerifyToken,
} from "../middleware/VerifyToken.js";

const user = express.Router();

user.get("/datauser", VerifyToken, adminAndPenjualVerify, getUser);
user.post("/register", Register);
user.post("/login", Login);
user.get("/refreshtoken", VerifyToken, RefreshToken);
user.delete("/logout/:id", VerifyToken, LogOut);

export default user;
