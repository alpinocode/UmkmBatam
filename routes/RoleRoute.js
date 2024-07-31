import express from "express";
import {
  createRole,
  deleteRole,
  getRole,
  getRoleId,
  updateRole,
} from "../controllers/Role.js";
import { VerifyToken, adminVerify } from "../middleware/VerifyToken.js";

const role = express.Router();

role.get("/role", VerifyToken, adminVerify, getRole);
role.get("/role/:id", VerifyToken, adminVerify, getRoleId);
role.post("/role", createRole);
role.patch("/role/:id", VerifyToken, updateRole);
role.delete("/role/:id", VerifyToken, deleteRole);

export default role;
