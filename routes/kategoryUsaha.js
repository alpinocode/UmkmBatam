import express from "express";
import {
  getKategori,
  createKategory,
  updateKategory,
  deleteKategori,
  getKategoriById,
} from "../controllers/kategoriUsaha.js";
import {
  adminVerify,
  PenjualVerify,
  VerifyToken,
} from "../middleware/VerifyToken.js";

const kategori = express.Router();

kategori.get("/kategori", VerifyToken, getKategori);
kategori.get("/kategori/:id", VerifyToken, PenjualVerify, getKategoriById);
kategori.post(
  "/kategori/create",
  VerifyToken,
  PenjualVerify || adminVerify,
  createKategory
);
kategori.put(
  "/kategori/:id",
  VerifyToken,
  PenjualVerify,
  adminVerify,
  updateKategory
);
kategori.delete(
  "/kategori/:id",
  VerifyToken,
  PenjualVerify,
  adminVerify,
  deleteKategori
);

export default kategori;
