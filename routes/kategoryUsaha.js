import express from "express";
import {
  getKategori,
  createKategory,
  updateKategory,
  deleteKategori,
  getKategoriById,
} from "../controllers/kategoriUsaha.js";
import {
  adminAndPenjualVerify,
  VerifyToken,
} from "../middleware/VerifyToken.js";

const kategori = express.Router();

kategori.get("/kategori", VerifyToken, getKategori);
kategori.get(
  "/kategori/:id",
  VerifyToken,
  adminAndPenjualVerify,
  getKategoriById
);
kategori.post(
  "/kategori/create",
  VerifyToken,
  adminAndPenjualVerify,
  createKategory
);
kategori.put(
  "/kategori/:id",
  VerifyToken,
  adminAndPenjualVerify,
  updateKategory
);
kategori.delete(
  "/kategori/:id",
  VerifyToken,
  adminAndPenjualVerify,
  deleteKategori
);

export default kategori;
