import expresss from "express";
import {
  getProduk,
  createProduk,
  updateProduk,
  deleteProduk,
  getProdukById,
} from "../controllers/produkController.js";
import { PenjualVerify, VerifyToken } from "../middleware/VerifyToken.js";

const produk = expresss.Router();

produk.get("/produk", VerifyToken, getProduk);
produk.get("/produk/:id", VerifyToken, PenjualVerify, getProdukById);
produk.post("/produk/create", VerifyToken, PenjualVerify, createProduk);
produk.patch("/produk/:id", VerifyToken, PenjualVerify, updateProduk);
produk.delete("/produk/:id", VerifyToken, PenjualVerify, deleteProduk);

export default produk;
