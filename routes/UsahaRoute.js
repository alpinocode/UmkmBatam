import express from "express";
import {
  getUsaha,
  createUsaha,
  updateUsaha,
  getUsahaId,
  deleteUsaha,
} from "../controllers/usahaControlerrs.js";
import {
  adminVerify,
  PenjualVerify,
  VerifyToken,
} from "../middleware/VerifyToken.js";

const usaha = express.Router();

usaha.get("/usaha", VerifyToken, getUsaha);
usaha.get("/usaha/:id", VerifyToken, PenjualVerify || adminVerify, getUsahaId);
usaha.post("/usaha/create", VerifyToken, PenjualVerify, createUsaha);
usaha.patch("/usaha/:id", VerifyToken, PenjualVerify, updateUsaha);
usaha.delete("/usaha/:id", VerifyToken, PenjualVerify, deleteUsaha);

export default usaha;
