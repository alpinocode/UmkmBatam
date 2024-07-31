import express from "express";
import {
  createKomentar,
  deleteKomentar,
  getKomentar,
  getKomentarById,
  updateKomentar,
} from "../controllers/Komentar.js";
import { VerifyToken } from "../middleware/VerifyToken.js";

const route = express.Router();

route.get("/komentar", VerifyToken, getKomentar);
route.get("/komentar/:id", VerifyToken, getKomentarById);
route.post("/komentar", VerifyToken, createKomentar);
route.patch("/komentar/:id", VerifyToken, updateKomentar);
route.delete("/komentar/:id", VerifyToken, deleteKomentar);

export default route;
