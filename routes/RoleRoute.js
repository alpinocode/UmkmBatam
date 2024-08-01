import express from "express";
import {
  createRole,
  deleteRole,
  getRole,
  getRoleId,
  updateRole,
} from "../controllers/Role.js";
import {
  adminAndPenjualVerify,
  adminOnly,
  VerifyToken,
} from "../middleware/VerifyToken.js";

const role = express.Router();

role.get("/role", VerifyToken, adminAndPenjualVerify, getRole);
role.get("/role/:id", VerifyToken, adminAndPenjualVerify, getRoleId);
role.post("/role", createRole);
role.patch("/role/:id", VerifyToken, updateRole);
role.delete("/role/:id", VerifyToken, deleteRole);

export default role;
